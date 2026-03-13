'use client';

// 공유 버튼 컴포넌트
// 링크 복사, 이미지 다운로드 2가지 공유 버튼 UI

import { useState } from 'react';
import type { CharacterProfile } from '@/lib/types';
import Toast from './Toast';
import { useTranslation } from '@/lib/hooks/useTranslation';
import { trackShare } from '@/lib/analytics';
import { withBasePath } from '@/lib/basePath';

interface ShareButtonsProps {
  character: CharacterProfile;
  resultUrl: string;
  onLinkCopied?: () => void; // 링크 복사 시 콜백
}

export default function ShareButtons({ character, resultUrl, onLinkCopied }: ShareButtonsProps) {
  const { t, locale } = useTranslation();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // 링크 복사 핸들러
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(resultUrl);
      setToastMessage(t('share.linkCopied'));
      // 공유 추적
      trackShare('link_copy', character.slug);
      // 링크 복사 완료 시 콜백 호출
      if (onLinkCopied) {
        onLinkCopied();
      }
    } catch (err) {
      console.error('Failed to copy:', err);
      setToastMessage(t('share.linkCopyFailed'));
    }
  };

  // 이미지 다운로드 핸들러
  const handleDownloadImage = () => {
    const link = document.createElement('a');
    link.href = withBasePath(`/og/${character.slug}-${locale}.png`);
    link.download = `kiro-friends-${character.slug}-${locale}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setToastMessage(t('share.imageDownload'));
    // 공유 추적
    trackShare('image_download', character.slug);
  };

  return (
    <div className="relative" data-testid="share-buttons">
      <div className="flex flex-col gap-2.5">
        {/* 링크 복사 버튼 */}
        <button
          onClick={handleCopyLink}
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3
                     min-h-[48px] bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-xl
                     border border-purple-800/40 transition-colors duration-200
                     text-sm"
          data-testid="share-copy-button"
          aria-label={t('share.copyLink')}
        >
          <span aria-hidden="true">🔗</span>
          {t('share.copyLink')}
        </button>

        {/* 이미지 다운로드 버튼 */}
        <button
          onClick={handleDownloadImage}
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3
                     min-h-[48px] bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-xl
                     border border-purple-800/40 transition-colors duration-200
                     text-sm"
          data-testid="share-download-button"
          aria-label={t('share.downloadImage')}
        >
          <span aria-hidden="true">📥</span>
          {t('share.downloadImage')}
        </button>
      </div>

      {/* Toast 알림 */}
      {toastMessage && (
        <Toast 
          message={toastMessage} 
          onClose={() => setToastMessage(null)} 
        />
      )}
    </div>
  );
}
