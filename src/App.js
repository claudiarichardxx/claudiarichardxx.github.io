import React, { useState } from 'react';
import { motion,  } from 'framer-motion';
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
                animate={{ opacity: 1, y: 0 }}
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

function App() {

    const [selectedProject, setSelectedProject] = useState(null);

    const projects = [
        {
            id: 1,
            title: 'Decoding MBTI Personality Types from Written Text (2024)',
            description: 'BERT-based classification of user posts to predict personality types.',
            media: '/files/MBTI.jpg', 
            caption: 'Model Architecture',
            details: [
                'Utilized BERT with a linear classifier to classify an individual\'s personality based on posts written by them.',
                'Made the model interpretable by utilizing gradients to show important pieces of text.',
                'Skills: Python (Programming Language) · Gradients · Interpretable AI · Natural Language Processing (NLP) · BERT (Language Model) · Text Classification'
            ],
        },
        {
            id: 2,
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
            id: 3,
            title: 'A Search Engine for Computer Science Papers (2023)',
            description: 'Web scraping, clustering, and semantic search using BERT.',
            media: '/files/SearchEngine.mov',
            caption: 'Search Engine Demo',
            details: [
                'Scraped the website arxiv.org using BeautifulSoup to build a database of computer science papers.',
                'Performed clustering to form clusters for smart indexing.',
                'Stored the abstracts and keywords of the papers in a locally hosted Elastic Search.',
                'Used a BERT model for semantic query matching using cosine similarity as the distance measure.',
                'Enabled syntactic query matching through Elastic Search.',
                'Built a UI using NodeJS and JavaScript, and used FastAPI for Python API creation.',
                'Skills: Python (Programming Language) · API Development · Semantic Search · FastAPI · Elasticsearch · JavaScript · Clustering · Web Scraping · Search Engine Development'
            ],
        },
        {
            id: 4,
            title: 'Ensemble Deep Learning for Diabetic Retinopathy Detection (2023)',
            description: 'Fine-tuned CNN models for enhanced diagnostic performance.',
            media: '/files/CNN-1.png',
            caption: 'Model Architecture',
            details: [
                'Utilized transfer learning to fine-tune pre-trained CNN models on a large diabetic retinopathy dataset, significantly improving diagnostic performance.',
                'Skills: Python (Programming Language) · Computer Vision · OpenCV · Convolutional Neural Networks (CNN) · AI for Healthcare'
            ],
        },
    ];


    const timelineData = [
        {
            year: 'Jan 2025',
            title: 'Completed M.Sc Computer Science (AI + Thesis Stream)',
            type: 'Education',
            details: ['University of Windsor (Sept 2023 – Jan 2025)'],
        },
        {
            year: 'Sept 2023',
            title: 'Started Research Assistantship + Thesis Work',
            type: 'Work Experience',
            details: [
                'Conducted research in large language models (LLMs) with a focus on instruction tuning for code generation.',
                'Fine-tuned LLMs using Parameter Efficient Fine Tuning (PEFT) strategies to optimize distributed training performance.',
                'Created synthetic datasets using `Evol-Instruct`, a method of evolving instruction-output pairs to improve data diversity.',
                'Designed, developed, and refined prompts using prompt engineering techniques.',
                'Evaluated model performance using the HumanEval and MBPP benchmarks.'
            ],
        },
        {
            year: 'Sept 2023',
            title: 'Started Graduate Assistantship',
            type: 'Work Experience',
            details: [
                'Coordinated the “Internship Project” course for four terms with industry partners, bridging gaps between academic and business objectives.'
            ],
        },
        {
            year: 'Apr 2021',
            title: 'Joined as a full-time Data Analyst (NLP)',
            type: 'Work Experience',
            details: [
                'Worked on a chatbot project using GPT models (OpenAI API), LangChain, and Pinecone for Retrieval Augmented Generation (RAG).',
                'Created a Python package that leverages hierarchical clustering algorithms to cluster large text datasets for bulk data labeling.',
                'Automated the creation of new applications on wit.ai and the execution of repetitive SQL queries.',
                'Performed sentiment and exploratory analysis on customer data.',
                'Contributed to a churn prediction project using audio data and BERT models, achieving over 70% accuracy.',
                'Built a chatbot using a Keras Long Short-Term Memory model for context prediction and trained it to identify over 50 categories of services, employed it to collect relevant information from the users, and used a MongoDB database for data storage.'
            ],
        },
        {
            year: 'Apr 2021',
            title: 'Started Internship as Data Analyst Intern (NLP)',
            type: 'Work Experience',
            details: [
                'Sulekha.com (Apr 2021 – Jul 2021):',
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
    
    const scrollToSection = (sectionId) => {
        document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
      };

    
  return (
    <div className="app-container">

        {/* Sidebar */}
      <div className="sidebar">
        <ul>
          <li onClick={() => scrollToSection('summary-section')}>Summary</li>
          <li onClick={() => scrollToSection('timeline-section')}>Timeline</li>
          <li onClick={() => scrollToSection('projects-section')}>Projects</li>
          <li onClick={() => scrollToSection('publications-section')}>Publications</li>
          <li onClick={() => scrollToSection('contact-section')}>Contact Me!</li>
        </ul>
      </div>

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
        <h2 className="text-4xl font-bold mb-4">Professional Summary</h2>
        <p className="text-lg">
        Machine Learning Engineer specializing in LLM fine-tuning for code generation with 4 years of combined NLP experience. Master`s graduate in AI-focused Computer Science with expertise in machine learning models, instruction tuning, and prompt engineering. Industry experience (2.5 years) in Retrieval Augmented Generation (RAG), and large-scale NLP applications.
        </p>
      </section>

            {/* Timeline Section */}
            <section id="timeline-section" className="timeline bg-white text-black p-8 rounded-lg shadow-lg mt-10">
            <h2 className="timeline-titletile ">A timeline of my key experiences</h2>
            <Timeline timelineData={timelineData} />
            </section>

            {/* Projects Section */}
            <section id="projects-section" className="projects-section min-h-screen bg-white text-black p-6 rounded-lg shadow-lg mt-10" style={{ position: 'relative', width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
    <h1 className="bg-white text-black p-8 rounded-lg shadow-lg mt-10 center-align-h1">Projects</h1>
    {/* Projects List */}
    <div className="flex flex-col space-y-4 w-full items-center">
        {projects.map((project) => (
            <div key={project.id} className="w-full max-w-lg box-border mb-4">
                {/* Render the Project Card */}
                <motion.div
                    className="project-card bg-gray-100 p-8 rounded-lg shadow-md cursor-pointer w-full"
                    whileHover={{ scale: 1.02 }}
                    onClick={() => handleProjectClick(project)} // Toggle project details on card click
                >
                    <h3 className="text-3xl font-semibold">{project.title}</h3>
                    <p className="text-lg">{project.description}</p>
                </motion.div>

                {/* Detailed View of the clicked project */}
                {selectedProject && selectedProject.id === project.id && (
                    <motion.div
                        className="project-details bg-gray-200 p-6 rounded-lg shadow-lg mt-4"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.5 }}
                    >
                        <ul className="project-details-list">
                            {project.details.map((detail, detailIndex) => (
                                <li key={detailIndex} className="project-detail-item">
                                    {detail}
                                </li>
                            ))}
                        </ul>
                        {/* Render media (image or video) */}
                        {project.media && (
                            <div className="project-media">
                                {project.media.endsWith('.mp4') || project.media.endsWith('.mov') ? (
                                    <video controls className="media-element" style={{ display: 'block', margin: '0 auto' }}>
                                        <source src={project.media} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                ) : (
                                    <img src={project.media} alt={project.title} className="media-element" style={{ display: 'block', margin: '0 auto' }} />
                                )}
                                {/* Render caption */}
                                {project.caption && (
                                    <p className="media-caption">{project.caption}</p>
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
                <h2 className="text-4xl font-bold mb-4">Publications</h2>
                <p className="text-lg">Here are some of my publications:</p>
                <ul className="publications-list">
                    <li className="publication-item">
                        <h3 className="publication-abstract">
                            <a href="https://scholar.uwindsor.ca/etd/9662/" target="_blank" rel="noopener noreferrer" className="publication-link">
                            The Fine-Tuning Effect: A Study on Instruction Tuning for Code Generation
                            </a>
                        </h3>
                        <p className="publication-details">
Instruction tuning enhances language models by fine-tuning them on instruction-output pairs, particularly improving performance in code generation tasks. Models like OctoCoder and Wavecoder have shown significant gains in pass@k metrics. However, instruction tuning is resource-intensive and often inaccessible for users with limited computational power. Additionally, many existing datasets are too simplistic, hindering performance on complex tasks. In this research, we introduce a new Leetcode dataset featuring complex problems and Python implementations to improve instruction tuning. We fine-tune the CodeLlama model using this dataset and explore two fine-tuning methods: Instruction Tuning, which focuses on generated code tokens, and Instruction Modelling, which considers both instruction and code tokens for better context awareness. We also use Llama 3 in the Evol-Instruct method to generate additional instructions, avoiding closed-source models like GPT. Additionally, we investigate the impact of different LoRA ranks in Instruction Tuning and present a detailed analysis of failure cases on the HumanEval dataset. To address the high resource demands, we employ parameter-efficient techniques like LoRA (Low-Rank Adaptation) and qLoRA, which reduce model weights to 4-bit precision. Our evaluation, using the HumanEval and MBPP datasets, with pass@k as the primary metric, demonstrates a scalable, resource-efficient approach to instruction tuning for code generation.
</p>
Richard Davidson, Claudia Lois, "The Fine-Tuning Effect: A Study on Instruction Tuning for Code Generation" (2025). Electronic Theses and Dissertations. 9662.
                    </li>
                    <li className="publication-item">
                        <h3 className="publication-abstract">
                            <a href="https://ieeexplore.ieee.org/document/9841183" target="_blank" rel="noopener noreferrer" className="publication-link">
                            Effective Behavioural Analysis using Polystore Data Catalog and Intelligent Learning
                            </a>
                        </h3>
                        <p className="publication-details">
This paper aims to design and implement an application usage behaviour analytics system to produce dynamic bundles personalized to each customer. A H2O Deep Learning model was first built to predict the list of products that are most likely to be reordered by each customer, on the basis of which bundle combinations were framed. The model was found to have an accuracy score of 83.04, a precision score of 84.7 and a recall score of 96.31. The products comprising each customer’s bundle were determined by a 3:1 ratio of products that the customer is most expected to purchase to the products that are less popular. This implementation starts with building a data lineage and catalog from multiple data sources with persistent data collected from transactions and product catalogs which was then used to identify, model, analyze behavioral patterns and collect insights in order to build the prediction model. This method of recommendation attempts to solve the cold-start effect of new products and to eliminate the popularity bias in bundle recommendation systems by producing personalized dynamic bundles in such a way that it improves the sales of unpopular products while also contributing to overall customer satisfaction. The technical stack that was used for implementing this idea includes Apache Spark, Mongodb Atlas and Apache H2O.</p>
2021 International Conference on Simulation, Automation & Smart Manufacturing (SASM)
                    </li>
                    {/* Add more publications as needed */}
                </ul>
            </section>



            {/* Contact Details Section */}
            <section id="contact-section"  className="contact-details bg-blue-500 text-white p-8 rounded-lg shadow-lg mt-10">
            <h2 className="text-4xl font-bold mb-4 text-center">Contact Details</h2>
            <div className="flex flex-col items-center space-y-4">
                <p className="text-lg">Feel free to reach out to me through any of the following methods:</p>
                <div className="flex flex-col items-center space-y-2">
                <p className="text-xl">📧 Email: <a href="mailto:claudiarichardxx@gmail.com" className="publication-link" target="_blank" rel="noopener noreferrer">claudiarichardxx@gmail.com</a></p>
                <p className="text-xl">🌐 GitHub: <a href="https://github.com/claudiarichardxx" className="publication-link" target="_blank" rel="noopener noreferrer">github.com/claudiarichardxx</a></p>
                <p className="text-xl">🔗 LinkedIn: <a href="https://www.linkedin.com/in/claudia-lois-richard-9099371bb/" className="publication-link" target="_blank" rel="noopener noreferrer">linkedin.com/in/claudia-lois-richard-9099371bb/</a></p>
                </div>
            </div>
            </section>


        </div>
    );
};


export default App;