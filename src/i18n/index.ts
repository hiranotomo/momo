import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      header: {
        title: 'Research Dashboard',
        subtitle: 'Microbe-Plant Co-evolution Studies',
        researcher: 'Dr. Researcher'
      },
      nav: {
        overview: 'Overview',
        experiments: 'Experiments',
        dataVisualization: 'Data Visualization',
        metagenome: 'Metagenome Analysis',
        interactions: '3D Interactions',
        learning: 'Learning Module',
        collaboration: 'Collaboration'
      },
      overview: {
        title: 'Research Overview',
        subtitle: 'Real-time monitoring of your microbe-plant co-evolution studies',
        metrics: {
          samplesAnalyzed: 'Samples Analyzed',
          speciesIdentified: 'Species Identified',
          interactionsDiscovered: 'Interactions Discovered',
          publications: 'Publications'
        },
        timeline: {
          title: 'Research Timeline',
          sampleCollection: 'Sample Collection Phase',
          sampleCollectionDesc: 'Collected 500+ moss samples from various habitats',
          dnaExtraction: 'DNA Extraction & Sequencing',
          dnaExtractionDesc: 'High-throughput sequencing of microbial communities',
          bioinformatics: 'Bioinformatics Analysis',
          bioinformaticsDesc: 'Metagenomic assembly and annotation in progress',
          interactionNetwork: 'Interaction Network Analysis',
          interactionNetworkDesc: 'Identify co-evolution patterns and symbiotic relationships',
          validation: 'Validation Experiments',
          validationDesc: 'Laboratory validation of key interactions',
          progress: 'Progress'
        },
        alerts: {
          title: 'Recent Alerts',
          noAlerts: 'No recent alerts',
          dnaSuccess: 'DNA extraction completed successfully',
          qualityWarning: 'Sample quality check: 3 samples below threshold',
          newBatch: 'New sequencing batch scheduled for tomorrow'
        },
        activity: {
          title: 'Recent Activity',
          newExperiment: 'Started new co-culture experiment',
          newExperimentDesc: 'Testing symbiotic interactions between Bryum argenteum and Nostoc sp.',
          dataUpload: 'Uploaded sequencing data',
          dataUploadDesc: '50GB of metagenomic sequences from highland moss samples',
          analysisComplete: 'Completed pathway analysis',
          analysisCompleteDesc: 'Identified 23 novel metabolic pathways in moss-associated microbiome',
          newMember: 'New team member joined',
          newMemberDesc: 'Dr. Emily Wang joined as bioinformatics specialist',
          paperSubmitted: 'Paper submitted to Nature Communications',
          paperSubmittedDesc: 'Microbial diversity and co-evolution patterns in bryophyte ecosystems'
        }
      },
      experiments: {
        title: 'Experiment Tracker',
        subtitle: 'Monitor and manage your research experiments in real-time',
        stats: {
          activeExperiments: 'Active Experiments',
          completionRate: 'Completion Rate',
          avgProcessingTime: 'Avg. Processing Time',
          qualityScore: 'Quality Score'
        },
        pipeline: {
          title: 'Experiment Pipeline',
          samplePrep: 'Sample Preparation',
          dnaExtraction: 'DNA Extraction',
          libraryPrep: 'Library Preparation',
          sequencing: 'Sequencing',
          qualityControl: 'Quality Control',
          overallProgress: 'Overall Progress',
          estCompletion: 'Est. completion',
          samples: 'samples',
          complete: 'complete'
        },
        sampleStatus: {
          title: 'Sample Status',
          processed: 'Processed',
          inProgress: 'In Progress',
          failed: 'Failed',
          pending: 'Pending',
          total: 'Total',
          viewReport: 'View Detailed Report'
        },
        qc: {
          title: 'Quality Control Metrics',
          liveMonitoring: 'Live Monitoring',
          dnaConcentration: 'DNA Concentration',
          purity: 'Purity (260/280)',
          fragmentSize: 'Fragment Size',
          contamination: 'Contamination',
          threshold: 'Threshold',
          qualityTrend: 'Quality Score Trend (24h)',
          overallStatus: 'Overall Quality Status: PASS',
          generateReport: 'Generate QC Report'
        }
      },
      dataViz: {
        title: 'Data Visualization',
        subtitle: 'Explore and analyze your research data with interactive visualizations',
        controls: {
          title: 'Visualization Controls',
          dateRange: 'Date Range',
          lastDays: 'Last 30 days',
          entityTypes: 'Entity Types',
          microbes: 'Microbes',
          plants: 'Plants',
          metabolites: 'Metabolites',
          interactionTypes: 'Interaction Types',
          symbiotic: 'Symbiotic',
          parasitic: 'Parasitic',
          neutral: 'Neutral',
          competitive: 'Competitive',
          minAbundance: 'Minimum Abundance',
          applyFilters: 'Apply Filters',
          exportData: 'Export Data'
        },
        charts: {
          charts: 'Charts',
          heatmap: 'Heatmap',
          network: 'Network',
          filters: 'Filters',
          speciesAbundance: 'Species Abundance by Habitat',
          diversityIndices: 'Diversity Indices Over Time',
          taxonomicDist: 'Taxonomic Distribution',
          functionalTraits: 'Functional Traits Comparison',
          metaboliteHeatmap: 'Metabolite Production Heatmap'
        }
      },
      metagenome: {
        title: 'Metagenome Analysis',
        subtitle: 'Explore the microbial diversity and taxonomic composition of your samples',
        searchPlaceholder: 'Search taxa...',
        taxonomyTree: 'Interactive Taxonomy Tree',
        relativeAbundance: 'Relative Abundance',
        average: 'Average',
        max: 'Max',
        diversityMetrics: 'Diversity Metrics',
        alphaStatus: 'Alpha Diversity Status:',
        highDiversity: 'High',
        diversityDesc: 'Sample shows healthy microbial diversity with balanced community structure'
      },
      interactions: {
        title: '3D Interaction Network',
        subtitle: 'Explore microbe-plant interactions in an immersive 3D environment',
        controls: {
          title: '3D Controls',
          layers: 'Layers',
          edgeOpacity: 'Edge Opacity',
          nodeSize: 'Node Size'
        },
        details: {
          title: 'Node Details',
          entity: 'Entity',
          type: 'Type',
          connections: 'Connections',
          properties: 'Properties',
          abundance: 'Abundance',
          activity: 'Activity',
          influence: 'Influence',
          viewAnalysis: 'View Full Analysis',
          high: 'High',
          active: 'Active'
        }
      },
      learning: {
        title: 'Learning Module',
        subtitle: 'Enhance your understanding of microbe-plant co-evolution',
        modules: {
          modules: 'Modules',
          learningPath: 'Learning Path',
          interactiveTutorial: 'Interactive Tutorial',
          knowledgeQuiz: 'Knowledge Quiz'
        },
        path: {
          title: 'Your Learning Journey',
          introSymbiosis: 'Introduction to Symbiosis',
          introSymbiosisDesc: 'Learn the basics of symbiotic relationships in nature',
          mossBiology: 'Moss Biology Fundamentals',
          mossBiologyDesc: 'Understanding bryophyte structure and physiology',
          microbialComm: 'Microbial Communities',
          microbialCommDesc: 'Explore the diversity of moss-associated microbiomes',
          coEvolution: 'Co-evolution Mechanisms',
          coEvolutionDesc: 'Deep dive into evolutionary processes and adaptations',
          researchApp: 'Research Applications',
          researchAppDesc: 'Practical applications in biotechnology and ecology',
          beginner: 'beginner',
          intermediate: 'intermediate',
          advanced: 'advanced',
          continueLearn: 'Continue Learning',
          overallProgress: 'Overall Progress',
          modulesCompleted: 'modules completed',
          min: 'min'
        }
      },
      collaboration: {
        title: 'Collaboration Space',
        subtitle: 'Connect with your research team and share insights',
        team: {
          title: 'Team Members',
          principalInvestigator: 'Principal Investigator',
          coInvestigator: 'Co-Investigator',
          postdoc: 'Postdoc Researcher',
          phdStudent: 'PhD Student',
          microbiology: 'Microbiology',
          genomics: 'Genomics',
          ecology: 'Ecology',
          bioinformatics: 'Bioinformatics',
          dataAnalysis: 'Data Analysis',
          molecularBiology: 'Molecular Biology',
          sequencing: 'Sequencing',
          fieldWork: 'Field Work',
          sampleCollection: 'Sample Collection'
        },
        data: {
          title: 'Shared Datasets',
          uploadData: 'Upload Data',
          genomic: 'genomic',
          transcriptomic: 'transcriptomic',
          metabolomic: 'metabolomic',
          phenotypic: 'phenotypic',
          by: 'by',
          downloadedTimes: 'Downloaded {{count}} times',
          storageUsage: 'Storage Usage',
          storageInfo: '{{used}} GB of {{total}} GB used'
        },
        meetings: {
          title: 'Upcoming Meetings',
          scheduleNew: 'Schedule New Meeting',
          weeklySync: 'Weekly Team Sync',
          dataReview: 'Data Analysis Review',
          labMeeting: 'Lab Meeting',
          virtual: 'virtual',
          inPerson: 'in-person',
          attendees: 'attendees',
          hour: 'hour',
          hours: 'hours'
        },
        forum: {
          title: 'Discussion Forum',
          startNew: 'Start New Discussion',
          by: 'by',
          ago: 'ago'
        }
      },
      common: {
        systemStatus: 'System Status',
        allSystemsOperational: 'All systems operational',
        loading: 'Loading...',
        error: 'Error',
        success: 'Success',
        warning: 'Warning',
        info: 'Info',
        close: 'Close',
        save: 'Save',
        cancel: 'Cancel',
        delete: 'Delete',
        edit: 'Edit',
        view: 'View',
        download: 'Download',
        upload: 'Upload',
        search: 'Search',
        filter: 'Filter',
        export: 'Export',
        import: 'Import',
        refresh: 'Refresh',
        settings: 'Settings',
        help: 'Help',
        logout: 'Logout',
        profile: 'Profile',
        notifications: 'Notifications',
        minutes: 'm',
        hours: 'h',
        days: 'd',
        timeAgo: '{{value}}{{unit}} ago',
        by: 'by',
        ago: 'ago'
      }
    }
  },
  ja: {
    translation: {
      header: {
        title: '研究ダッシュボード',
        subtitle: '微生物-植物共進化研究',
        researcher: '研究者'
      },
      nav: {
        overview: '概要',
        experiments: '実験',
        dataVisualization: 'データ可視化',
        metagenome: 'メタゲノム解析',
        interactions: '3D相互作用',
        learning: '学習モジュール',
        collaboration: 'コラボレーション'
      },
      overview: {
        title: '研究概要',
        subtitle: '微生物-植物共進化研究のリアルタイムモニタリング',
        metrics: {
          samplesAnalyzed: '解析済みサンプル',
          speciesIdentified: '同定種数',
          interactionsDiscovered: '発見された相互作用',
          publications: '論文'
        },
        timeline: {
          title: '研究タイムライン',
          sampleCollection: 'サンプル収集フェーズ',
          sampleCollectionDesc: '様々な生息地から500以上のコケサンプルを収集',
          dnaExtraction: 'DNA抽出・シーケンシング',
          dnaExtractionDesc: '微生物群集のハイスループットシーケンシング',
          bioinformatics: 'バイオインフォマティクス解析',
          bioinformaticsDesc: 'メタゲノムアセンブリとアノテーション進行中',
          interactionNetwork: '相互作用ネットワーク解析',
          interactionNetworkDesc: '共進化パターンと共生関係の特定',
          validation: '検証実験',
          validationDesc: '主要な相互作用の実験室での検証',
          progress: '進捗'
        },
        alerts: {
          title: '最近のアラート',
          noAlerts: '最近のアラートはありません',
          dnaSuccess: 'DNA抽出が正常に完了しました',
          qualityWarning: 'サンプル品質チェック：3サンプルが閾値以下',
          newBatch: '新しいシーケンシングバッチが明日予定されています'
        },
        activity: {
          title: '最近のアクティビティ',
          newExperiment: '新しい共培養実験を開始',
          newExperimentDesc: 'ギンゴケとネンジュモの共生相互作用をテスト',
          dataUpload: 'シーケンシングデータをアップロード',
          dataUploadDesc: '高地コケサンプルから50GBのメタゲノムシーケンス',
          analysisComplete: 'パスウェイ解析完了',
          analysisCompleteDesc: 'コケ関連マイクロバイオームで23の新規代謝経路を同定',
          newMember: '新しいチームメンバーが参加',
          newMemberDesc: 'Dr. Emily Wangがバイオインフォマティクス専門家として参加',
          paperSubmitted: 'Nature Communicationsに論文投稿',
          paperSubmittedDesc: 'コケ生態系における微生物多様性と共進化パターン'
        }
      },
      experiments: {
        title: '実験トラッカー',
        subtitle: '研究実験をリアルタイムで監視・管理',
        stats: {
          activeExperiments: 'アクティブな実験',
          completionRate: '完了率',
          avgProcessingTime: '平均処理時間',
          qualityScore: '品質スコア'
        },
        pipeline: {
          title: '実験パイプライン',
          samplePrep: 'サンプル準備',
          dnaExtraction: 'DNA抽出',
          libraryPrep: 'ライブラリ調製',
          sequencing: 'シーケンシング',
          qualityControl: '品質管理',
          overallProgress: '全体の進捗',
          estCompletion: '完了予定',
          samples: 'サンプル',
          complete: '完了'
        },
        sampleStatus: {
          title: 'サンプルステータス',
          processed: '処理済み',
          inProgress: '処理中',
          failed: '失敗',
          pending: '保留中',
          total: '合計',
          viewReport: '詳細レポートを表示'
        },
        qc: {
          title: '品質管理メトリクス',
          liveMonitoring: 'ライブモニタリング',
          dnaConcentration: 'DNA濃度',
          purity: '純度 (260/280)',
          fragmentSize: 'フラグメントサイズ',
          contamination: 'コンタミネーション',
          threshold: '閾値',
          qualityTrend: '品質スコアトレンド（24時間）',
          overallStatus: '全体の品質ステータス：合格',
          generateReport: 'QCレポート生成'
        }
      },
      dataViz: {
        title: 'データ可視化',
        subtitle: 'インタラクティブな可視化で研究データを探索・分析',
        controls: {
          title: '可視化コントロール',
          dateRange: '日付範囲',
          lastDays: '過去30日間',
          entityTypes: 'エンティティタイプ',
          microbes: '微生物',
          plants: '植物',
          metabolites: '代謝物',
          interactionTypes: '相互作用タイプ',
          symbiotic: '共生',
          parasitic: '寄生',
          neutral: '中立',
          competitive: '競争',
          minAbundance: '最小存在量',
          applyFilters: 'フィルタを適用',
          exportData: 'データをエクスポート'
        },
        charts: {
          charts: 'チャート',
          heatmap: 'ヒートマップ',
          network: 'ネットワーク',
          filters: 'フィルタ',
          speciesAbundance: '生息地別の種の存在量',
          diversityIndices: '時系列多様性指数',
          taxonomicDist: '分類学的分布',
          functionalTraits: '機能形質の比較',
          metaboliteHeatmap: '代謝物産生ヒートマップ'
        }
      },
      metagenome: {
        title: 'メタゲノム解析',
        subtitle: 'サンプルの微生物多様性と分類学的組成を探索',
        searchPlaceholder: '分類群を検索...',
        taxonomyTree: 'インタラクティブ分類ツリー',
        relativeAbundance: '相対存在量',
        average: '平均',
        max: '最大',
        diversityMetrics: '多様性メトリクス',
        alphaStatus: 'アルファ多様性ステータス：',
        highDiversity: '高い',
        diversityDesc: 'サンプルはバランスの取れた群集構造で健全な微生物多様性を示しています'
      },
      interactions: {
        title: '3D相互作用ネットワーク',
        subtitle: '没入型3D環境で微生物-植物の相互作用を探索',
        controls: {
          title: '3Dコントロール',
          layers: 'レイヤー',
          edgeOpacity: 'エッジの不透明度',
          nodeSize: 'ノードサイズ'
        },
        details: {
          title: 'ノードの詳細',
          entity: 'エンティティ',
          type: 'タイプ',
          connections: '接続',
          properties: 'プロパティ',
          abundance: '存在量',
          activity: 'アクティビティ',
          influence: '影響度',
          viewAnalysis: '完全な分析を表示',
          high: '高い',
          active: 'アクティブ'
        }
      },
      learning: {
        title: '学習モジュール',
        subtitle: '微生物-植物共進化の理解を深める',
        modules: {
          modules: 'モジュール',
          learningPath: '学習パス',
          interactiveTutorial: 'インタラクティブチュートリアル',
          knowledgeQuiz: '知識クイズ'
        },
        path: {
          title: 'あなたの学習ジャーニー',
          introSymbiosis: '共生入門',
          introSymbiosisDesc: '自然界の共生関係の基礎を学ぶ',
          mossBiology: 'コケ生物学の基礎',
          mossBiologyDesc: 'コケ植物の構造と生理学を理解する',
          microbialComm: '微生物群集',
          microbialCommDesc: 'コケ関連マイクロバイオームの多様性を探る',
          coEvolution: '共進化メカニズム',
          coEvolutionDesc: '進化プロセスと適応の詳細な探求',
          researchApp: '研究応用',
          researchAppDesc: 'バイオテクノロジーと生態学での実用的応用',
          beginner: '初級',
          intermediate: '中級',
          advanced: '上級',
          continueLearn: '学習を続ける',
          overallProgress: '全体の進捗',
          modulesCompleted: 'モジュール完了',
          min: '分'
        }
      },
      collaboration: {
        title: 'コラボレーションスペース',
        subtitle: '研究チームとつながり、洞察を共有',
        team: {
          title: 'チームメンバー',
          principalInvestigator: '主任研究者',
          coInvestigator: '共同研究者',
          postdoc: 'ポスドク研究員',
          phdStudent: '博士課程学生',
          microbiology: '微生物学',
          genomics: 'ゲノミクス',
          ecology: '生態学',
          bioinformatics: 'バイオインフォマティクス',
          dataAnalysis: 'データ分析',
          molecularBiology: '分子生物学',
          sequencing: 'シーケンシング',
          fieldWork: 'フィールドワーク',
          sampleCollection: 'サンプル収集'
        },
        data: {
          title: '共有データセット',
          uploadData: 'データをアップロード',
          genomic: 'ゲノム',
          transcriptomic: 'トランスクリプトーム',
          metabolomic: 'メタボローム',
          phenotypic: '表現型',
          by: 'by',
          downloadedTimes: '{{count}}回ダウンロード',
          storageUsage: 'ストレージ使用状況',
          storageInfo: '{{total}} GBのうち{{used}} GB使用'
        },
        meetings: {
          title: '今後のミーティング',
          scheduleNew: '新しいミーティングをスケジュール',
          weeklySync: '週次チーム同期',
          dataReview: 'データ分析レビュー',
          labMeeting: 'ラボミーティング',
          virtual: 'オンライン',
          inPerson: '対面',
          attendees: '参加者',
          hour: '時間',
          hours: '時間'
        },
        forum: {
          title: 'ディスカッションフォーラム',
          startNew: '新しいディスカッションを開始',
          by: 'by',
          ago: '前'
        }
      },
      common: {
        systemStatus: 'システムステータス',
        allSystemsOperational: 'すべてのシステムが正常に動作中',
        loading: '読み込み中...',
        error: 'エラー',
        success: '成功',
        warning: '警告',
        info: '情報',
        close: '閉じる',
        save: '保存',
        cancel: 'キャンセル',
        delete: '削除',
        edit: '編集',
        view: '表示',
        download: 'ダウンロード',
        upload: 'アップロード',
        search: '検索',
        filter: 'フィルタ',
        export: 'エクスポート',
        import: 'インポート',
        refresh: '更新',
        settings: '設定',
        help: 'ヘルプ',
        logout: 'ログアウト',
        profile: 'プロフィール',
        notifications: '通知',
        minutes: '分',
        hours: '時間',
        days: '日',
        timeAgo: '{{value}}{{unit}}前',
        by: 'by'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ja', // デフォルトを日本語に設定
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;