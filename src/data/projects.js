/**
 * DHANUSH G — Portfolio Projects Data
 * Detailed real project information from Dhanush's resume
 */

export const projects = [
  {
    id: 'ai-traffic-prediction',
    slug: 'ai-traffic-prediction',
    title: 'AI Traffic Prediction & Dynamic Route Optimization',
    shortTitle: 'AI Traffic Prediction',
    category: 'Graph Algorithms & Machine Learning',
    featured: true,
    tagline: 'Sub-Second Graph Rerouting Meets Continuous GBDT Regression',
    summary: 'An intelligent transportation system combining continuous travel-time regression with dynamic graph routing to alleviate urban road congestion.',
    description: 'Developed an intelligent transportation and navigation system combining continuous travel-time regression with dynamic graph routing to alleviate urban road congestion. Implemented a Gradient Boosted Decision Tree (GBDT) regressor along with A* and Dijkstra graph algorithms to calculate optimal routes and dynamic rerouting during simulated incidents. Designed an interactive geospatial dashboard using React and Leaflet to visualize live traffic density, road segment speeds, active bottlenecks, and alternative route comparisons.',
    coverImage: '/images/project_traffic_ai.jpg',
    technologies: ['React 19', 'Python', 'FastAPI', 'Machine Learning', 'Docker', 'Leaflet', 'GBDT', 'A* Algorithm', 'Dijkstra'],
    metrics: [
      { label: 'Rerouting Latency', value: '< 18ms' },
      { label: 'Algorithm', value: 'A* Solver + Dijkstra' },
      { label: 'Model Engine', value: 'Continuous GBDT' }
    ],
    highlights: [
      'Engineered GBDT regression models to predict edge traversal time variations under rainfall, incidents, and peak surges.',
      'Implemented dynamic A* graph solver with Euclidean heuristics calculating sub-second alternative paths.',
      'Designed responsive geospatial dashboard with Leaflet tile layer rendering real-time arterial congestion.',
      'Containerized full application with Docker for seamless multi-stage deployments.'
    ],
    githubUrl: 'https://github.com/DHANUSH-PRO11',
    demoUrl: 'https://github.com/DHANUSH-PRO11'
  },
  {
    id: 'smart-railway-crowd',
    slug: 'smart-railway-crowd',
    title: 'Smart Railway Crowd Prediction & Risk Engine',
    shortTitle: 'Smart Railway Crowd Engine',
    category: 'MLOps & Time-Series Forecasting',
    featured: true,
    tagline: 'Forecasting High-Density Commuter Spikes With 0.957 R² Precision',
    summary: 'A multi-horizon platform crowd regression system forecasting passenger density across 15, 30, and 60-minute windows with automated champion-challenger MLOps validation.',
    description: 'Built a multi-horizon platform crowd regression system forecasting density at 15, 30, and 60-minute windows using time-series features and chronological cross-validation without data leakage. Engineered GBDT regression models and a dynamic platform risk scoring algorithm, achieving a 29.5 MAE (0.957 R²) and outperforming persistence heuristics by over 53%. Constructed an automated MLOps retraining pipeline featuring champion-challenger model validation, ground-truth observation ingestion, and Dockerized CI/CD workflows.',
    coverImage: '/images/project_railway_crowd.jpg',
    technologies: ['Python', 'XGBoost', 'Scikit-learn', 'FastAPI', 'MLOps', 'Docker', 'Time-Series', 'CI/CD'],
    metrics: [
      { label: 'Accuracy Score', value: '0.957 R²' },
      { label: 'Mean Absolute Error', value: '29.5 MAE' },
      { label: 'Baseline Lift', value: '+53.4%' }
    ],
    highlights: [
      'Engineered chronological cross-validation folds ensuring zero temporal data leakage across 15k+ observations.',
      'Outperformed baseline persistence heuristics by >53% across morning and evening peak windows.',
      'Constructed automated MLOps retraining pipelines with champion-challenger gate validation.',
      'Built high-throughput FastAPI REST telemetry endpoints Dockerized for production.'
    ],
    githubUrl: 'https://github.com/DHANUSH-PRO11',
    demoUrl: 'https://github.com/DHANUSH-PRO11'
  },
  {
    id: 'agronex-smart-agriculture',
    slug: 'agronex-smart-agriculture',
    title: 'AgroNex – Automated Smart Agriculture Platform',
    shortTitle: 'AgroNex Agriculture Platform',
    category: 'Full-Stack & Computer Vision',
    featured: true,
    tagline: 'Empowering Farmers With Sub-Second Pathological Telemetry & Audio',
    summary: 'A full-stack agricultural diagnostics platform using React 19 and FastAPI with computer-vision pathology classification and bilingual voice streaming in Tamil & English.',
    description: 'Developed a full-stack web platform using React 19 and FastAPI to automate crop disease diagnostics, weather advisory alerts, and historical health records for agricultural users. Designed an asynchronous media pipeline supporting multipart image uploads and bilingual voice streaming (Tamil & English), integrating external services with error handling and sub-second response times.',
    coverImage: '/images/project_agronex.jpg',
    technologies: ['React 19', 'Python', 'FastAPI', 'PostgreSQL', 'Supabase', 'PyTorch', 'Audio Streaming', 'Tamil & English NLP'],
    metrics: [
      { label: 'Diagnostic Confidence', value: '97.8%' },
      { label: 'Voice Streaming', value: 'Tamil & EN' },
      { label: 'Response Time', value: '< 250ms' }
    ],
    highlights: [
      'Built asynchronous multipart image upload pipeline for real-time foliar disease diagnostics.',
      'Integrated bilingual streaming audio advisory pipeline in both Tamil (தமிழ்) and English.',
      'Designed PostgreSQL & Supabase database schema for offline sync and historical treatment records.',
      'Crafted high-contrast responsive interface optimized for agricultural field operations.'
    ],
    githubUrl: 'https://github.com/DHANUSH-PRO11',
    demoUrl: 'https://github.com/DHANUSH-PRO11'
  }
];

export function getProjectBySlug(slug) {
  return projects.find(p => p.slug === slug);
}
