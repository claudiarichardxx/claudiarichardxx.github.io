import React, { useState, useEffect } from 'react';
import { motion,  AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faGoogle } from '@fortawesome/free-brands-svg-icons';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './App.css';


const Timeline = ({ timelineData }) => {
    const [expandedItem, setExpandedItem] = useState(null);
    
    const handleItemClick = (index) => {
      // Toggle the expanded item
      setExpandedItem(expandedItem === index ? null : index);
    };
  
    return (
      <div className="timeline-container">
        <div className="timeline-line"></div>
        <ul className="timeline">
          {timelineData.map((item, index) => (
            <li
              key={index}
              className={`timeline-item ${expandedItem === index ? 'active' : ''}`}
              onClick={() => handleItemClick(index)}
            >
              <motion.div
                className={`timeline-content ${expandedItem === index ? 'expanded' : ''}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 0.9, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="timeline-title">{item.title}</h3>
                <span className="timeline-type">{item.type}</span>
                <p className="timeline-year">{item.year}</p>
                {expandedItem === index && (
                <ul className="timeline-details">
                    {item.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="timeline-detail-item">
                            {detail}
                        </li>
                    ))}
                </ul>
            )}
              </motion.div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  // Sidebar Component
const Sidebar = ({ isOpen, onClose, onNavigate }) => (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="sidebar"
          initial={{ x: 300 }}
          animate={{ x: 0 }}
          exit={{ x: 300 }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        >
          <button className="close-sidebar-btn" onClick={onClose}>>>></button>
          <ul>
            <li onClick={() => { onNavigate('summary-section'); }}>Summary</li>
            <li onClick={() => { onNavigate('timeline-section'); }}>Timeline</li>
            <li onClick={() => { onNavigate('projects-section'); }}>Projects</li>
            <li onClick={() => { onNavigate('articles-section'); }}>Articles</li>
            <li onClick={() => { onNavigate('publications-section'); }}>Publications</li>
            <li onClick={() => { onNavigate('contact-section');}}>Contact Me!</li>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
  
  // Floating Open Button
  const SidebarToggleButton = ({ onClick }) => (
    <button className="open-sidebar-btn" onClick={onClick}>
      ☰ Menu
    </button>
  );

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [articleContent, setArticleContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const readerRef = React.useRef(null);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/articles/manifest.json`)
      .then((res) => res.json())
      .then(setArticles)
      .catch(() => setArticles([]));
  }, []);

  const openArticle = async (slug) => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.PUBLIC_URL}/articles/${slug}.md`);
      const text = await res.text();
      setArticleContent(text);
      setSelectedArticle(slug);
    } catch {
      setArticleContent('Failed to load article.');
      setSelectedArticle(slug);
    }
    setLoading(false);
    setTimeout(() => readerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  };

  const closeArticle = () => {
    setSelectedArticle(null);
    setArticleContent('');
  };

  const allTags = [...new Set(articles.flatMap((a) => a.tags || []))].sort();

  const filteredArticles = articles.filter((article) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      article.title.toLowerCase().includes(q) ||
      article.summary.toLowerCase().includes(q) ||
      article.tags?.some((tag) => tag.toLowerCase().includes(q))
    );
  });

  const handleTagClick = (tag) => {
    setSearchQuery((prev) => prev.toLowerCase() === tag.toLowerCase() ? '' : tag);
  };

  return (
    <div className="articles-container">
      <div className="articles-search-bar">
        <input
          type="text"
          className="articles-search-input"
          placeholder="Search articles by title, summary, or tags..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button className="articles-search-clear" onClick={() => setSearchQuery('')}>
            ✕
          </button>
        )}
      </div>

      <div className="articles-all-tags">
        {allTags.map((tag) => (
          <span
            key={tag}
            className={`article-filter-tag ${searchQuery.toLowerCase() === tag.toLowerCase() ? 'article-filter-tag-active' : ''}`}
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="articles-grid">
        {filteredArticles.length === 0 && (
          <p className="no-articles">
            {articles.length === 0
              ? 'No articles yet. Check back soon!'
              : 'No articles match your search.'}
          </p>
        )}
        {filteredArticles.map((article) => (
          <motion.div
            key={article.slug}
            className={`article-card ${selectedArticle === article.slug ? 'article-card-active' : ''}`}
            whileHover={{ scale: 1.02 }}
            onClick={() => openArticle(article.slug)}
          >
            <h3 className="article-card-title">{article.title}</h3>
            <span className="article-card-date">{article.date}</span>
            <p className="article-card-summary">{article.summary}</p>
            <div className="article-card-tags">
              {article.tags?.map((tag) => (
                <span
                  key={tag}
                  className={`article-tag ${searchQuery && tag.toLowerCase().includes(searchQuery.toLowerCase()) ? 'article-tag-match' : ''}`}
                  onClick={(e) => { e.stopPropagation(); setSearchQuery(tag); }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            className="article-reader"
            ref={readerRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
          >
            <button className="article-back-btn" onClick={closeArticle}>
              ← Close Article
            </button>
            {loading ? (
              <p className="article-loading">Loading...</p>
            ) : (
              <div className="article-markdown-scroll">
                <div className="article-markdown">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {articleContent}
                  </ReactMarkdown>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function App() {

    const [selectedProject, setSelectedProject] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen((prev) => !prev);
    const scrollToSection = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  
    const projects = [
      {
        id: 1,
        title: 'Task Scheduler (2026)',
        description: 'A web app for planning and organizing tasks with a clean, focused workflow.',
        details: [
            'Designed and built an end-to-end task scheduling experience with fast interactions and simple UX.',
            'Has many themes to choose from to customize the look and feel of the application.',
            'Passive scheduling of tasks - Adds tasks to a dump and lets users schedule them at a later time.',
            'Permission to snooze tasks for a later time.',
            'Uses firebase for authentication and storage.',
            'Works on all devices and browsers, built using flutter and dart.',
        ],
        links: [
            { label: 'Live application', url: 'https://task-scheduler-ff2aa.web.app/' },
        ],
    },
        {
            id: 2,
            title: 'Decoding MBTI Personality Types from Written Text (2024)',
            description: 'BERT-based classification of user posts to predict personality types.',
            media: '/files/MBTI.jpg', 
            caption: 'Model Architecture',
            details: [
                'Developed a BERT-based personality prediction model, leveraging a linear classifier for final classification.',
                'Incorporated Integrated Gradients to enhancemodelexplainability and mitigate bias.',
                'Demonstrated potential for improving personalization and user profiling in recommendation systems.',
                'Skills: Python (Programming Language) · Gradients · Interpretable AI · Natural Language Processing (NLP) · BERT (Language Model) · Text Classification'
            ],
        },
        {
            id: 3,
            title: 'Ethereum Price Forecasting (2024)',
            description: 'Comparative study of statistical and deep learning models for forecasting.',
            media: '/files/ethereum.png',
            caption: 'LSTM Model Performance',
            details: [
                'Experimented with traditional ARIMA, smooth-based, and moving average models for Ethereum price forecasting.',
                'Used Pandas and Matplotlib for historical data analysis.',
                'Created a modern LSTM model for better series forecasting and compared the results with the traditional approaches.',
                'Skills: Python (Programming Language) · Statistical Modeling · Neural Networks · Long Short-term Memory (LSTM) · Time Series Forecasting'
            ],
        },
        {
            id: 4,
            title: 'A Search Engine for Computer Science Papers (2023)',
            description: 'Web scraping, clustering, and semantic search using BERT.',
            media: '/files/SearchEngine.mov',
            caption: 'Search Engine Demo',
            details: [
                'Scraped the website arxiv.org using BeautifulSoup to build a database of computer science papers.',
                'Performed clustering to form clusters for smart indexing, reducing search runtime by 50%.',
                'Stored the abstracts and keywords of the papers in a locally hosted Elastic Search.',
                'Used a BERT model for semantic query matching using cosine similarity as the distance measure.',
                'Enabled syntactic query matching through Elastic Search.',
                'Built a UI using NodeJS and JavaScript, and used FastAPI for Python API creation.',
                'Skills: Python (Programming Language) · API Development · Semantic Search · FastAPI · Elasticsearch · JavaScript · Clustering · Web Scraping · Search Engine Development'
            ],
        },
        {
            id: 5,
            title: 'Ensemble Deep Learning for Diabetic Retinopathy Detection (2023)',
            description: 'Fine-tuned CNN models for enhanced diagnostic performance.',
            media: '/files/CNN-1.png',
            caption: 'Model Architecture',
            details: [
                'Utilized transfer learning to fine-tune pre-trained CNN models on a large diabetic retinopathy dataset, significantly improving diagnostic performance.',
                'Skills: Python (Programming Language) · Computer Vision · OpenCV · Convolutional Neural Networks (CNN) · AI for Healthcare'
            ],
        }
    ];


    const timelineData = [
      {
        year: 'Oct 2025',
        title: 'Started working as a Backend Software Engineer at Stephen Avenue Marketing',
        type: 'Work Experience',
        details: ['Architected the ERCOT RTM forecasting system as a modular, class-based Python package with reproducible training and inference.',
          'Built a data-processing pipeline for ERCOT market data (RTM, DAM, weather, outages) including sanitization and feature handling.',
          'Designed a feature-scoring framework combining Pearson/Spearman correlation, SNR ratios, and univariate R2 to evaluate predictive power and automatically reject unstable features.',
          'Integrated model explainability using SHAP and permutation importance, producing stakeholder-ready visualizations and structured feature-importance reports.',
          'Automated evaluation and reporting, generating multi-tab Excel summaries with error metrics and diagnostics.'
        ]
    },
        {
            year: 'Jan 2025',
            title: 'Started working as an AI Data Specialist at Outlier AI',
            type: 'Work Experience',
            details: ['Served as a Computer Science and language expert, building upon high-quality post training datasets with an emphasis on Supervised Fine Tuning and Reinforcement Learning from Human Feedback(RLHF) for next generation LLMs.',
              'Curated and evaluated data for multimodal, conversational, and Q&A LLMs to support robust AI development.',
              'Reviewed prompts and model outputs to ensure alignment with legal, ethical, and safety guidelines in line with responsible AI practices across 10+ distinct use cases.'
            ],
        },
        {
            year: 'Jan 2025',
            title: 'Completed M.Sc Computer Science (AI + Thesis Stream)',
            type: 'Education',
            details: ['University of Windsor (Sept 2023 - Jan 2025)'],
        },
        {
            year: 'Sept 2023',
            title: 'Started Research Assistantship + Thesis Work',
            type: 'Work Experience',
            details: [
                'Improved LLM code generation performance by instruction-tuning CodeLlama models with QLoRA and PEFT, reducing compute costs from ~$4000 to $15 and training time from ~1351 hours to 5 hours by optimizing only 0.37% of model parameters.',                
                'Created synthetic datasets using Evol-Instruct to enhance model performance.',
                'Developed and iteratively refined prompt engineering techniques, increasing code generation success rates on complex tasks.',
                'Achieved a 6.7% pass@1 improvement on HumanEval and a 7.1% improvement on MBPP benchmarks after fine-tunin',
                'Reduced failed test cases due to unterminated code lines by 97.3%, significantly enhancing code output reliability.'
            ],
        },
        {
            year: 'Sept 2023',
            title: 'Started Graduate Assistantship',
            type: 'Work Experience',
            details: [
                'Managed 20+ teams as a Graduate Assistant for the Internship Project course (COMP8967), bridging academia with business.',
                'Facilitated project management, team dynamics, and communication between students and industry partners.',
                'Provided mentorship and support to students, enhancing their project management skills and industry readiness.',
            ],
        },
        {
            year: 'Apr 2021',
            title: 'Joined as a Data Scientist',
            type: 'Work Experience',
            details: [
                'Improved search query understanding by developing a BERT-based context prediction model, increasing accuracy by 25%, deployed on AWS EC2 with data in MongoDB for production use.',
                'Automated repetitive tasks, including API-driven application development, testing, and SQL query execution, reducing manual effort by approximately 60%.',                
                'Reduced training data curation time by over 70% and streamlined failure case identification by developing scalable hierarchical clustering algorithms for large-scale text datasets.',
                'Developed scalable RAG (Retrieval Augmented Generation) pipelines for multiple client chatbots by setting up dedicated Pinecone vector databases and integrating LangChain and OpenAI APIs, enabling customized conversational AI for each client.',
                'Developed a churn prediction model leveraging audio data, achieving over 70% accuracy, helping in targeted retention efforts.'
            ],
        },
        {
            year: 'Apr 2021',
            title: 'Started Internship as Data Analyst Intern',
            type: 'Work Experience',
            details: [
                'Performed Natural Language Processing for retrieving important data from audio files for efficient decision making.',
                'Worked with the AWS Transcribe service, Python, and the Microsoft SQL server management tool.'
            ],
        },
        {
            year: 'May 2021',
            title: 'Completed B.E Computer Science',
            type: 'Education',
            details: ['KCG College of Technology, Anna University (2017-2021)'],
        },
        {
            year: 'Apr 2021',
            title: 'Completed Research Project: Customer Behaviour Analysis',
            type: 'Thesis',
            details: [
                'Led a team of 3 for this project that involved feature engineering and analysis of customer data to predict the probability of reorder of previously purchased products.',
                'Implemented a customized bundle recommendation system based on the predictions.',
                'Worked with Apache Spark, Apache H2O, and MongoDB Atlas.'
            ],
        }
    ];

    
    const handleProjectClick = (project) => {
        // If the clicked project is already selected, set it to null to close
        if (selectedProject && selectedProject.id === project.id) {
          setSelectedProject(null);
        } else {
          setSelectedProject(project);
        }
      };
    
    // const scrollToSection = (sectionId) => {
    //     document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
    //   };

    
  return (
    <div className="app-container">
        
        {/* Sidebar */}
      {/*<div className="sidebar">
        <ul>
          <li onClick={() => scrollToSection('summary-section')}>Summary</li>
          <li onClick={() => scrollToSection('timeline-section')}>Timeline</li>
          <li onClick={() => scrollToSection('projects-section')}>Projects</li>
          <li onClick={() => scrollToSection('publications-section')}>Publications</li>
          <li onClick={() => scrollToSection('contact-section')}>Contact Me!</li>
        </ul>
      </div>*/}

       {/* Floating Menu Button */}
       {!sidebarOpen && <SidebarToggleButton onClick={toggleSidebar} />}

{/* Sidebar Drawer */}
<Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onNavigate={scrollToSection} />


      {/* Hero Section with Background Image */}
      <div className="hero-section">
        <div className="text-center p-8 space-y-6">
          <motion.h1
            className="text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Hello! I'm Claudia. Welcome to My Portfolio!
          </motion.h1>
          <motion.p
            className="text-xl mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Discover my projects, skills, and creative journey through this interactive experience.
          </motion.p> 
        </div>
      </div>

      {/* Summary Section */}
      <section id="summary-section" className="about-me bg-white text-white p-8 rounded-lg shadow-lg mt-10">
        <h2 className="text-xl mb-8 text-white">Professional Summary</h2>
        <p className="text-xl mb-8">  
        Machine Learning Engineer specializing in LLM fine-tuning for code generation with 4 years of combined NLP experience. Master's graduate in AI-focused Computer Science with expertise in machine learning models, instruction tuning, and prompt engineering. Industry experience in Retrieval Augmented Generation (RAG), and large-scale NLP applications.        
</p>
      </section>

            {/* Timeline Section */}
            <section id="timeline-section" className="timeline bg-white text-black p-8 rounded-lg shadow-lg mt-10">
            <h2 className="timeline-titletile ">A timeline of my key experiences</h2>
            <Timeline timelineData={timelineData} />
            </section>

            {/* Articles Section */}
            <section id="articles-section" className="articles-section bg-white text-black p-8 rounded-lg shadow-lg mt-10">
              <h2 className="timeline-titletile bg-white text-black p-8 rounded-lg shadow-lg mt-10 center-align-h1">Articles</h2>
              <Articles />
            </section>

            {/* Projects Section */}
            <section id = "projects-section" className="projects-section min-h-screen bg-white text-black p-6 rounded-lg shadow-lg mt-10" style={{ position: 'relative', marginLeft: 'auto', marginRight: 'auto' }}>
            <h1 className = "timeline-titletile bg-white text-black p-8 rounded-lg shadow-lg mt-10 center-align-h1">Projects</h1>
            {/* Projects List */}
            <div className="flex flex-col space-y-4 w-full items-center">
                {projects.map((project) => (
            <div key={project.id} className="w-full max-w-lg box-border mb-4">
                {/* Render the Project Card */}
                <motion.div
    className="project-card bg-gray-100 p-8 rounded-lg shadow-md cursor-pointer w-full"
    whileHover={{ scale: 1.02 }}
    onClick={() => handleProjectClick(project)}
  >
    <h3 className="timeline-type text-3xl font-semibold text-white">{project.title}</h3>
    <p className="timeline-type text-lg">{project.description}</p>
  </motion.div>

  {/* Separate details box outside the card */}
  {selectedProject && selectedProject.id === project.id && (
    <motion.div
      className="project-details bg-gray-200 p-6 rounded-lg shadow-lg mt-4 w-full"
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 0.95, y: 0 }}
      exit={{ opacity: 0, y: 5 }}
      transition={{ duration: 0.5 }}
    >
      <ul className="project-details-list list-disc pl-6">
        {project.details.map((detail, i) => (
          <li key={i} className="project-detail-item">{detail}</li>
        ))}
      </ul>

      {project.links?.length > 0 && (
        <div className="mt-4">
          <ul className="project-details-list list-disc pl-6">
            {project.links.map((link) => (
              <li key={link.url} className="project-detail-item">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="publication-link"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {project.media && (
        <div className="project-media mt-4">
          {project.media.endsWith(".mp4") || project.media.endsWith(".mov") ? (
            <video controls className="media-element mx-auto max-w-full">
              <source src={project.media} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={project.media}
              alt={project.title}
              className="media-element mx-auto max-w-full"
            />
          )}
          {project.caption && (
            <p className="media-caption text-sm text-center mt-2">{project.caption}</p>
          )}
        </div>
      )}
    </motion.div>
  )}

                
            </div>
        ))}
    </div>
</section>

            

            {/* Publications Section */}

            <section id="publications-section" className="publications bg-white text-black p-8 rounded-lg shadow-lg mt-10">
                <h2 className="timeline-titletile bg-white text-black p-8 rounded-lg shadow-lg mt-10 center-align-h1">Publications</h2>
                <ul className="publications-list">
                    <li className="publication-item">
                        <h3 className="publication-abstract">
                            <a href="https://scholar.uwindsor.ca/etd/9662/" target="_blank" rel="noopener noreferrer" className="publication-link">
                            The Fine-Tuning Effect: A Study on Instruction Tuning for Code Generation ~ Richard Davidson, Claudia Lois, "The Fine-Tuning Effect: A Study on Instruction Tuning for Code Generation" (2025). Electronic Theses and Dissertations. 9662.
                            </a>
                        </h3>
                        <p className="publication-details">
Instruction tuning enhances language models by fine-tuning them on instruction-output pairs, particularly improving performance in code generation tasks. Models like OctoCoder and Wavecoder have shown significant gains in pass@k metrics. However, instruction tuning is resource-intensive and often inaccessible for users with limited computational power. Additionally, many existing datasets are too simplistic, hindering performance on complex tasks. In this research, we introduce a new Leetcode dataset featuring complex problems and Python implementations to improve instruction tuning. We fine-tune the CodeLlama model using this dataset and explore two fine-tuning methods: Instruction Tuning, which focuses on generated code tokens, and Instruction Modelling, which considers both instruction and code tokens for better context awareness. We also use Llama 3 in the Evol-Instruct method to generate additional instructions, avoiding closed-source models like GPT. Additionally, we investigate the impact of different LoRA ranks in Instruction Tuning and present a detailed analysis of failure cases on the HumanEval dataset. To address the high resource demands, we employ parameter-efficient techniques like LoRA (Low-Rank Adaptation) and qLoRA, which reduce model weights to 4-bit precision. Our evaluation, using the HumanEval and MBPP datasets, with pass@k as the primary metric, demonstrates a scalable, resource-efficient approach to instruction tuning for code generation.
</p>
                    </li>
                    <li className="publication-item">
                        <h3 className="publication-abstract">
                            <a href="https://ieeexplore.ieee.org/document/9841183" target="_blank" rel="noopener noreferrer" className="publication-link">
                            Effective Behavioural Analysis using Polystore Data Catalog and Intelligent Learning ~ 2021 International Conference on Simulation, Automation & Smart Manufacturing (SASM)
                            </a>
                        </h3>
                        <p className="publication-details">
This paper aims to design and implement an application usage behaviour analytics system to produce dynamic bundles personalized to each customer. A H2O Deep Learning model was first built to predict the list of products that are most likely to be reordered by each customer, on the basis of which bundle combinations were framed. The model was found to have an accuracy score of 83.04, a precision score of 84.7 and a recall score of 96.31. The products comprising each customer’s bundle were determined by a 3:1 ratio of products that the customer is most expected to purchase to the products that are less popular. This implementation starts with building a data lineage and catalog from multiple data sources with persistent data collected from transactions and product catalogs which was then used to identify, model, analyze behavioral patterns and collect insights in order to build the prediction model. This method of recommendation attempts to solve the cold-start effect of new products and to eliminate the popularity bias in bundle recommendation systems by producing personalized dynamic bundles in such a way that it improves the sales of unpopular products while also contributing to overall customer satisfaction. The technical stack that was used for implementing this idea includes Apache Spark, Mongodb Atlas and Apache H2O.</p>

                    </li>
                    {/* Add more publications as needed */}
                </ul>
            </section>

            {/* Contact Details Section */}

             <section id = "contact-section" className="publications bg-white text-black p-8 rounded-lg shadow-lg mt-10">
                <h2 className = "timeline-titletile bg-white text-black p-8 rounded-lg shadow-lg mt-10 center-align-h1">Contact Me!</h2>
                
                <ul className = "contacts-list">
                    <li className = "contact-item">
                        <h3 className="text-xl"><FontAwesomeIcon icon={faGoogle} className="text-2xl mr-2" /> Email: <a href="mailto:claudiarichardxx@gmail.com" className="contact-link" target="_blank" rel="noopener noreferrer">claudiarichardxx@gmail.com</a>
                        </h3>
                        
                    </li>
                    <li className="contact-item">
                    <h3 className="text-xl"><FontAwesomeIcon icon={faGithub} className="text-2xl mr-2" /> GitHub: <a href="https://github.com/claudiarichardxx" className="contact-link" target="_blank" rel="noopener noreferrer">github.com/claudiarichardxx</a></h3>                    
                    </li>
                    
                    <li className="contact-item">
                    <h3 className="text-xl"><FontAwesomeIcon icon={faLinkedin} className="text-2xl mr-2" /> LinkedIn: <a href="https://www.linkedin.com/in/claudia-lois-richard-9099371bb/" className="contact-link" target="_blank" rel="noopener noreferrer">linkedin.com/in/claudia-lois-richard-9099371bb/</a></h3>                    
                    </li>

                </ul>
            </section>

            </div>
    );
};


export default App;