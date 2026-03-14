/**
 * OG 이미지 생성 스크립트
 *
 * Satori + @resvg/resvg-js 기반으로 10개 캐릭터 + 1개 기본 OG 이미지를 생성한다.
 * 캐릭터 PNG 이미지를 base64로 임베드하여 OG 이미지에 포함한다.
 * 출력: out/og/ 디렉토리에 1200x630px PNG 파일 11개
 *
 * 실행: npx tsx scripts/generate-og.ts
 */

import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import * as fs from 'node:fs';
import * as path from 'node:path';

// 캐릭터 데이터 직접 임포트 (tsx가 path alias를 지원하지 않으므로 상대 경로 사용)
import { characters } from '../src/data/characters';
import type { CharacterProfile } from '../src/lib/types';
import type { Locale } from '../src/lib/i18n/types';

// 번역 데이터 임포트
import koTranslations from '../src/lib/i18n/locales/ko.json';
import enTranslations from '../src/lib/i18n/locales/en.json';
import jaTranslations from '../src/lib/i18n/locales/ja.json';

const translations: Record<Locale, Record<string, string>> = {
  ko: koTranslations,
  en: enTranslations,
  ja: jaTranslations,
};

// 이미지 크기 상수
const WIDTH = 1200;
const HEIGHT = 630;

// 출력 디렉토리
const OUTPUT_DIR = path.resolve(process.cwd(), 'public/og');

// 캐릭터 이미지 디렉토리
const CHARACTERS_DIR = path.resolve(process.cwd(), 'public/characters');

// 배경 이미지 경로
const BG_IMAGE_PATH = path.resolve(process.cwd(), 'public/og/og_bg.png');

// 테마 색상
const COLORS = {
  bg: '#0a0a1a',
  bgGradientEnd: '#1a0a2e',
  primary: '#a855f7',
  secondary: '#f97316',
  text: '#e2e8f0',
  textMuted: '#94a3b8',
  accent: '#22d3ee',
};

// 축 라벨 매핑 (다국어)
const AXIS_LABELS: Record<Locale, Record<string, [string, string]>> = {
  ko: {
    A: ['안정', '실험'],
    B: ['구조', '즉흥'],
    C: ['개인', '협업'],
    D: ['품질', '속도'],
  },
  en: {
    A: ['Stable', 'Experimental'],
    B: ['Structured', 'Improvised'],
    C: ['Individual', 'Collaborative'],
    D: ['Quality', 'Speed'],
  },
  ja: {
    A: ['安定', '実験'],
    B: ['構造', '即興'],
    C: ['個人', '協力'],
    D: ['品質', '速度'],
  },
};

/** 폰트 데이터 로드 */
function loadFont(): ArrayBuffer {
  const fontPath = path.resolve(__dirname, 'fonts/NotoSansKR-Bold.ttf');
  return fs.readFileSync(fontPath).buffer as ArrayBuffer;
}

/** 배경 이미지를 base64 data URI로 로드 */
function loadBackgroundImage(): string {
  if (!fs.existsSync(BG_IMAGE_PATH)) {
    console.warn(`⚠️ 배경 이미지 없음: ${BG_IMAGE_PATH}`);
    return '';
  }
  const data = fs.readFileSync(BG_IMAGE_PATH);
  return `data:image/png;base64,${data.toString('base64')}`;
}

/** 캐릭터 PNG 이미지를 base64 data URI로 로드 */
function loadCharacterImage(slug: string): string {
  const imgPath = path.join(CHARACTERS_DIR, `${slug}.png`);
  if (!fs.existsSync(imgPath)) {
    console.warn(`⚠️ 캐릭터 이미지 없음: ${imgPath}`);
    return '';
  }
  const data = fs.readFileSync(imgPath);
  return `data:image/png;base64,${data.toString('base64')}`;
}

/** 축 값을 텍스트로 변환 (-1 → 왼쪽 라벨, +1 → 오른쪽 라벨) */
function getAxisLabel(axis: string, value: number, locale: Locale): string {
  const [left, right] = AXIS_LABELS[locale][axis] ?? ['?', '?'];
  return value <= 0 ? left : right;
}

/** 캐릭터별 OG 이미지 JSX 생성 */
function createCharacterOgMarkup(character: CharacterProfile, bgImageSrc: string, locale: Locale) {
  const axisEntries = Object.entries(character.axisValues) as [string, number][];
  const characterImgSrc = loadCharacterImage(character.slug);

  return {
    type: 'div',
    props: {
      style: {
        width: WIDTH,
        height: HEIGHT,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: bgImageSrc ? `url(${bgImageSrc})` : `linear-gradient(135deg, ${COLORS.bg} 0%, ${COLORS.bgGradientEnd} 100%)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        fontFamily: 'NotoSansKR',
        color: COLORS.text,
        padding: '40px 60px',
        position: 'relative',
      },
      children: [
        // 반투명 오버레이 (텍스트 가독성 향상)
        bgImageSrc
          ? {
              type: 'div',
              props: {
                style: {
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'rgba(10, 10, 26, 0.75)',
                },
              },
            }
          : null,
        // 콘텐츠 컨테이너 (오버레이 다음에 배치되어 위에 표시됨)
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            },
            children: [
              // 상단: Kiro 프렌즈 브랜딩
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '20px',
                    color: COLORS.textMuted,
                    marginBottom: '16px',
                  },
                  children: locale === 'ko' ? 'Kiro 프렌즈' : locale === 'en' ? 'Kiro Friends' : 'Kiroフレンズ',
                },
              },
              // 캐릭터 이미지
              characterImgSrc
                ? {
                    type: 'img',
                    props: {
                      src: characterImgSrc,
                      width: 120,
                      height: 120,
                      style: {
                        objectFit: 'contain',
                        marginBottom: '8px',
                      },
                    },
                  }
                : {
                    type: 'div',
                    props: {
                      style: { fontSize: '80px', marginBottom: '8px' },
                      children: character.emoji,
                    },
                  },
              // 유형명
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: '48px',
                    fontWeight: 700,
                    color: COLORS.primary,
                    marginBottom: '8px',
                    textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
                  },
                  children: character.name[locale],
                },
              },
              // 한 줄 소개
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: '24px',
                    color: COLORS.text,
                    marginBottom: '32px',
                    textAlign: 'center',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
                  },
                  children: character.description[locale],
                },
              },
              // 4축 시각화 (텍스트 기반)
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    gap: '24px',
                  },
                  children: axisEntries.map(([axis, value]) => ({
                    type: 'div',
                    props: {
                      style: {
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '12px 20px',
                        borderRadius: '12px',
                        background: 'rgba(168, 85, 247, 0.25)',
                        border: '1px solid rgba(168, 85, 247, 0.5)',
                        minWidth: '100px',
                        backdropFilter: 'blur(4px)',
                      },
                      children: [
                        {
                          type: 'div',
                          props: {
                            style: {
                              fontSize: '14px',
                              color: COLORS.text,
                              marginBottom: '4px',
                            },
                            children: `${AXIS_LABELS[locale][axis]?.[0]} ↔ ${AXIS_LABELS[locale][axis]?.[1]}`,
                          },
                        },
                        {
                          type: 'div',
                          props: {
                            style: {
                              fontSize: '22px',
                              fontWeight: 700,
                              color: COLORS.accent,
                            },
                            children: getAxisLabel(axis, value, locale),
                          },
                        },
                      ],
                    },
                  })),
                },
              },
            ],
          },
        },
      ],
    },
  };
}

/** 기본(랜딩 페이지용) OG 이미지 JSX 생성 */
function createDefaultOgMarkup(bgImageSrc: string, locale: Locale) {
  const t = (key: string) => translations[locale][key] || key;
  
  return {
    type: 'div',
    props: {
      style: {
        width: WIDTH,
        height: HEIGHT,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: bgImageSrc ? `url(${bgImageSrc})` : `linear-gradient(135deg, ${COLORS.bg} 0%, ${COLORS.bgGradientEnd} 100%)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        fontFamily: 'NotoSansKR',
        color: COLORS.text,
        padding: '40px 60px',
        position: 'relative',
      },
      children: [
        // 반투명 오버레이 (텍스트 가독성 향상)
        bgImageSrc
          ? {
              type: 'div',
              props: {
                style: {
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'rgba(10, 10, 26, 0.75)',
                },
              },
            }
          : null,
        // 콘텐츠 컨테이너
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              zIndex: 1,
            },
            children: [
              // 캐릭터 이미지 행
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    gap: '12px',
                    marginBottom: '24px',
                  },
                  children: characters.map((c) => {
                    const imgSrc = loadCharacterImage(c.slug);
                    return imgSrc
                      ? {
                          type: 'img',
                          props: {
                            src: imgSrc,
                            width: 48,
                            height: 48,
                            style: { objectFit: 'contain' },
                          },
                        }
                      : {
                          type: 'span',
                          props: {
                            style: { fontSize: '48px' },
                            children: c.emoji,
                          },
                        };
                  }),
                },
              },
              // 타이틀
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: '52px',
                    fontWeight: 700,
                    color: COLORS.primary,
                    marginBottom: '16px',
                    textAlign: 'center',
                    textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
                  },
                  children: locale === 'ko' 
                    ? '당신은 어떤 Kiro 프렌즈?'
                    : locale === 'en'
                    ? 'Which Kiro Friend Are You?'
                    : 'あなたはどのKiroフレンズ？',
                },
              },
              // 서브타이틀
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: '26px',
                    color: COLORS.text,
                    marginBottom: '24px',
                    textAlign: 'center',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
                  },
                  children: locale === 'ko' 
                    ? '한국 전통 설화 캐릭터로 알아보는 개발자 성향 테스트'
                    : locale === 'en'
                    ? 'Developer Personality Test with Korean Folklore Characters'
                    : '韓国の伝統説話キャラクターで知る開発者性格テスト',
                },
              },
              // 안내
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: '20px',
                    color: COLORS.secondary,
                    padding: '10px 28px',
                    borderRadius: '999px',
                    border: `2px solid ${COLORS.secondary}`,
                    background: 'rgba(249, 115, 22, 0.1)',
                    backdropFilter: 'blur(4px)',
                  },
                  children: locale === 'ko' 
                    ? '16문항 · 약 2분 소요'
                    : locale === 'en'
                    ? '16 questions · About 2 minutes'
                    : '16問 · 約2分',
                },
              },
            ],
          },
        },
      ],
    },
  };
}

/** SVG를 PNG로 변환 */
function svgToPng(svg: string): Buffer {
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: WIDTH },
  });
  const pngData = resvg.render();
  return Buffer.from(pngData.asPng());
}

/** 메인 실행 함수 */
async function main() {
  // 출력 디렉토리 생성
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const fontData = loadFont();
  const satoriOptions = {
    width: WIDTH,
    height: HEIGHT,
    fonts: [
      {
        name: 'NotoSansKR',
        data: fontData,
        weight: 700 as const,
        style: 'normal' as const,
      },
    ],
  };

  console.log('🎨 OG 이미지 생성 시작...\n');

  // 배경 이미지 로드
  const bgImageSrc = loadBackgroundImage();
  if (bgImageSrc) {
    console.log('✅ 배경 이미지 로드 완료\n');
  }

  const locales: Locale[] = ['ko', 'en', 'ja'];

  // 1. 기본 OG 이미지 생성 (각 언어별)
  for (const locale of locales) {
    const defaultMarkup = createDefaultOgMarkup(bgImageSrc, locale);
    const defaultSvg = await satori(defaultMarkup as React.ReactElement, satoriOptions);
    const defaultPng = svgToPng(defaultSvg);
    const defaultPath = path.join(OUTPUT_DIR, `default-${locale}.png`);
    fs.writeFileSync(defaultPath, defaultPng);
    console.log(`✅ default-${locale}.png (${defaultPng.length} bytes)`);
  }
  
  // 기본 default.png 생성 (한국어 버전 사용)
  const defaultMarkup = createDefaultOgMarkup(bgImageSrc, 'ko');
  const defaultSvg = await satori(defaultMarkup as React.ReactElement, satoriOptions);
  const defaultPng = svgToPng(defaultSvg);
  const defaultPath = path.join(OUTPUT_DIR, 'default.png');
  fs.writeFileSync(defaultPath, defaultPng);
  console.log(`✅ default.png (${defaultPng.length} bytes) (기본)`);


  // 2. 캐릭터별 OG 이미지 생성 (각 언어별)
  for (const character of characters) {
    for (const locale of locales) {
      const markup = createCharacterOgMarkup(character, bgImageSrc, locale);
      const svg = await satori(markup as React.ReactElement, satoriOptions);
      const png = svgToPng(svg);
      const filePath = path.join(OUTPUT_DIR, `${character.slug}-${locale}.png`);
      fs.writeFileSync(filePath, png);
      console.log(`✅ ${character.slug}-${locale}.png (${png.length} bytes) - ${character.emoji} ${character.name[locale]}`);
    }
    
    // 기본 이미지 생성 (한국어 버전 사용)
    const defaultMarkup = createCharacterOgMarkup(character, bgImageSrc, 'ko');
    const defaultSvg = await satori(defaultMarkup as React.ReactElement, satoriOptions);
    const defaultPng = svgToPng(defaultSvg);
    const defaultPath = path.join(OUTPUT_DIR, `${character.slug}.png`);
    fs.writeFileSync(defaultPath, defaultPng);
    console.log(`✅ ${character.slug}.png (${defaultPng.length} bytes) - ${character.emoji} ${character.name.ko} (기본)`);
  }

  console.log(`\n🎉 OG 이미지 ${(characters.length + 1) * 3 + characters.length + 1}개 생성 완료 → ${OUTPUT_DIR}`);
}

main().catch((err) => {
  console.error('❌ OG 이미지 생성 실패:', err);
  process.exit(1);
});
