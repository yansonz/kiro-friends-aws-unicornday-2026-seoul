// AWS 서비스 정보 및 캐릭터별 추천 매핑

export interface AWSService {
  id: string;
  name: string;
  url: string;
  category: 'ai' | 'compute' | 'database' | 'security' | 'network' | 'monitoring' | 'marketplace' | 'tool';
}

export const awsServices: Record<string, AWSService> = {
  'Amazon SageMaker': {
    id: 'sagemaker',
    name: 'Amazon SageMaker',
    url: 'https://aws.amazon.com/sagemaker/',
    category: 'ai',
  },
  'Amazon ECS': {
    id: 'ecs',
    name: 'Amazon ECS',
    url: 'https://aws.amazon.com/ecs/',
    category: 'compute',
  },
  'Amazon Aurora': {
    id: 'aurora',
    name: 'Amazon Aurora',
    url: 'https://aws.amazon.com/rds/aurora/',
    category: 'database',
  },
  'AWS Marketplace': {
    id: 'marketplace',
    name: 'AWS Marketplace',
    url: 'https://aws.amazon.com/marketplace/',
    category: 'marketplace',
  },
  'Amazon CloudWatch': {
    id: 'cloudwatch',
    name: 'Amazon CloudWatch',
    url: 'https://aws.amazon.com/cloudwatch/',
    category: 'monitoring',
  },
  'Kiro': {
    id: 'kiro',
    name: 'Kiro',
    url: 'https://kiro.dev/',
    category: 'tool',
  },
  'Amazon DynamoDB': {
    id: 'dynamodb',
    name: 'Amazon DynamoDB',
    url: 'https://aws.amazon.com/dynamodb/',
    category: 'database',
  },
  'Amazon CloudFront': {
    id: 'cloudfront',
    name: 'Amazon CloudFront',
    url: 'https://aws.amazon.com/cloudfront/',
    category: 'network',
  },
  'Amazon Bedrock': {
    id: 'bedrock',
    name: 'Amazon Bedrock',
    url: 'https://aws.amazon.com/bedrock/',
    category: 'ai',
  },
  'Amazon IVS': {
    id: 'ivs',
    name: 'Amazon IVS',
    url: 'https://aws.amazon.com/ivs/',
    category: 'network',
  },
  'AWS WAF': {
    id: 'waf',
    name: 'AWS WAF',
    url: 'https://aws.amazon.com/waf/',
    category: 'security',
  },
  'Amazon GuardDuty': {
    id: 'guardduty',
    name: 'Amazon GuardDuty',
    url: 'https://aws.amazon.com/guardduty/',
    category: 'security',
  },
  'Amazon AgentCore': {
    id: 'agentcore',
    name: 'Amazon AgentCore',
    url: 'https://aws.amazon.com/bedrock/agents/',
    category: 'ai',
  },
};

export interface CharacterAWSRecommendation {
  slug: string;
  recommendationText: {
    ko: string;
    en: string;
    ja: string;
  };
  awsServices: string[];
}

export const characterAWSRecommendations: Record<string, CharacterAWSRecommendation> = {
  gatssn: {
    slug: 'gatssn',
    recommendationText: {
      ko: '설계 없이 코드를 쓰지 않는 당신이라면, 시스템 전체를 조감하고 아키텍처를 올바르게 잡아주는 이 서비스들이 당신의 설계도를 현실로 만들어줄 것입니다.',
      en: 'If you never write code without a design, these services that oversee the entire system and establish the right architecture will turn your blueprints into reality.',
      ja: '設計なしでコードを書かないあなたなら、システム全体を俯瞰してアーキテクチャを正しく構築するこれらのサービスがあなたの設計図を現実にします。',
    },
    awsServices: ['Amazon SageMaker', 'Amazon ECS', 'Amazon Aurora', 'AWS Marketplace', 'Amazon CloudWatch', 'Kiro'],
  },
  chonggak: {
    slug: 'chonggak',
    recommendationText: {
      ko: '흐름이 끊기는 순간 모든 게 무너지는 당신을 위해, 설정 없이 바로 달리고 AI가 알아서 받쳐주는 이 5가지 서비스로 오늘 밤도 몰입을 지켜내세요.',
      en: 'For you who falls apart the moment flow breaks, protect your immersion tonight with these 5 services that run immediately without setup and are backed by AI.',
      ja: 'フローが途切れた瞬間すべてが崩れるあなたのために、設定なしですぐに走りAIが自動でサポートするこれらのサービスで今夜も没入を守りましょう。',
    },
    awsServices: ['Amazon DynamoDB', 'Amazon CloudFront', 'Amazon Bedrock', 'Amazon CloudWatch', 'Amazon ECS', 'Kiro'],
  },
  cheonyeo: {
    slug: 'cheonyeo',
    recommendationText: {
      ko: '픽셀 하나도 허투루 보지 않는 당신이라면, 사용자가 느끼는 속도·실시간성·안전함까지 UX의 레이어를 커버하는 이 5가지 서비스를 활용해보세요.',
      en: "If you don't overlook a single pixel, try these 5 services that cover UX layers from speed, real-time performance, to security that users feel.",
      ja: 'ピクセル一つも見逃さないあなたなら、ユーザーが感じる速度・リアルタイム性・安全性までUXのレイヤーをカバーするこれらのサービスを活用してください。',
    },
    awsServices: ['Amazon CloudFront', 'Amazon IVS', 'Amazon DynamoDB', 'Amazon SageMaker', 'AWS WAF', 'Kiro'],
  },
  dokkaebi: {
    slug: 'dokkaebi',
    recommendationText: {
      ko: '새로운 기술이라면 일단 써보는 당신을 위해, 최신 AI 모델부터 실시간 인터랙션까지 빠르게 PoC를 던질 수 있는 이 5가지 서비스로 오늘도 새로운 걸 터뜨려 보세요.',
      en: 'For you who tries any new technology first, launch something new today with these 5 services that let you quickly throw PoCs from latest AI models to real-time interactions.',
      ja: '新しい技術ならまず試すあなたのために、最新AIモデルからリアルタイムインタラクションまで素早くPoCを投げられるこれらのサービスで今日も新しいことを爆発させましょう。',
    },
    awsServices: ['Amazon Bedrock', 'Amazon SageMaker', 'Amazon IVS', 'AWS Marketplace', 'Amazon Aurora', 'Kiro'],
  },
  gumiho: {
    slug: 'gumiho',
    recommendationText: {
      ko: '반복 작업을 눈 앞에서 보면 손이 근질거리는 당신이라면, 파이프라인부터 AI 에이전트 워크플로우까지 자동화 스택을 완성해줄 이 5가지 서비스가 당신의 마법 지팡이입니다.',
      en: 'If your hands itch when you see repetitive work, these 5 services that complete your automation stack from pipelines to AI agent workflows are your magic wand.',
      ja: '繰り返し作業を目の前で見ると手がうずくあなたなら、パイプラインからAIエージェントワークフローまで自動化スタックを完成させるこれらのサービスがあなたの魔法の杖です。',
    },
    awsServices: ['Amazon ECS', 'Amazon CloudWatch', 'Amazon AgentCore', 'Amazon DynamoDB', 'AWS Marketplace', 'Kiro'],
  },
  haetae: {
    slug: 'haetae',
    recommendationText: {
      ko: '테스트 없이는 머지도 없다는 당신을 위해, 코드 품질부터 보안 위협까지 빈틈없이 감시하고 자동으로 검증해주는 이 5가지 서비스로 당신의 품질 기준을 인프라까지 확장하세요.',
      en: 'For you who believes no merge without tests, extend your quality standards to infrastructure with these 5 services that monitor from code quality to security threats and verify automatically.',
      ja: 'テストなしではマージもないというあなたのために、コード品質からセキュリティ脅威まで隙なく監視して自動検証するこれらのサービスであなたの品質基準をインフラまで拡張しましょう。',
    },
    awsServices: ['Amazon GuardDuty', 'AWS WAF', 'Amazon CloudWatch', 'Amazon Aurora', 'Amazon AgentCore', 'Kiro'],
  },
  jangseung: {
    slug: 'jangseung',
    recommendationText: {
      ko: '컨벤션과 프로세스를 지키는 게 팀의 경쟁력이라고 믿는 당신이라면, 보안 정책 강제부터 배포 표준화까지 조직 레벨의 거버넌스를 책임지는 이 5가지 서비스가 든든한 동료입니다.',
      en: 'If you believe maintaining conventions and processes is team competitiveness, these 5 services that handle organization-level governance from enforcing security policies to deployment standardization are reliable partners.',
      ja: '規約とプロセスを守ることがチームの競争力だと信じるあなたなら、セキュリティポリシー強制から配備標準化まで組織レベルのガバナンスを担当するこれらのサービスが頼もしい仲間です。',
    },
    awsServices: ['AWS WAF', 'Amazon GuardDuty', 'Amazon CloudWatch', 'AWS Marketplace', 'Amazon ECS', 'Kiro'],
  },
  jeoseung: {
    slug: 'jeoseung',
    recommendationText: {
      ko: '레거시 코드를 보면 청산 목록부터 뽑는 당신을 위해, DB 현대화부터 숨어있는 보안 부채 탐지까지 기술 부채를 체계적으로 끝내줄 이 5가지 서비스가 함께 저승길을 동행합니다.',
      en: 'For you who makes a liquidation list first when seeing legacy code, these 5 services that systematically end technical debt from DB modernization to detecting hidden security debt accompany you on the journey.',
      ja: 'レガシーコードを見ると清算リストから作るあなたのために、DB現代化から隠れたセキュリティ負債検出まで技術負債を体系的に終わらせるこれらのサービスが一緒に旅路を同行します。',
    },
    awsServices: ['Amazon Aurora', 'Amazon ECS', 'Amazon GuardDuty', 'Amazon CloudWatch', 'Amazon AgentCore', 'Kiro'],
  },
  mulgwisin: {
    slug: 'mulgwisin',
    recommendationText: {
      ko: '사람도 시스템도 연결되지 않으면 의미가 없다고 생각하는 당신이라면, 에이전트 오케스트레이션부터 글로벌 실시간 연결까지 모든 걸 이어주는 이 5가지 서비스가 당신의 네트워크를 완성합니다.',
      en: 'If you think nothing matters unless people and systems are connected, these 5 services that connect everything from agent orchestration to global real-time connections complete your network.',
      ja: '人もシステムも繋がらなければ意味がないと思うあなたなら、エージェントオーケストレーションからグローバルリアルタイム接続まですべてを繋ぐこれらのサービスがあなたのネットワークを完成させます。',
    },
    awsServices: ['Amazon AgentCore', 'Amazon DynamoDB', 'Amazon IVS', 'Amazon CloudFront', 'Amazon SageMaker', 'Kiro'],
  },
  dalgyal: {
    slug: 'dalgyal',
    recommendationText: {
      ko: '복잡한 건 숨기고 본질만 남기는 당신이라면, 수백 줄의 인프라 복잡성을 단순한 API로 추상화해주는 이 5가지 서비스야말로 당신이 가장 사랑할 서비스들입니다.',
      en: 'If you hide complexity and leave only essence, these 5 services that abstract hundreds of lines of infrastructure complexity into simple APIs are the services you will love most.',
      ja: '複雑なものは隠して本質だけ残すあなたなら、数百行のインフラ複雑性をシンプルなAPIに抽象化するこれらのサービスこそあなたが最も愛するサービスです。',
    },
    awsServices: ['Amazon Bedrock', 'Amazon IVS', 'Amazon GuardDuty', 'Amazon CloudFront', 'Amazon Aurora', 'Kiro'],
  },
};
