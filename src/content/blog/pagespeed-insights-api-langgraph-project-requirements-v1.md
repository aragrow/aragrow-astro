---
title: "PageSpeed Insights API - LangGraph Project Requirements - V1"
date: "2025-09-16"
modified: "2025-09-16"
slug: "pagespeed-insights-api-langgraph-project-requirements-v1"
author: "David Arago"
categories: ["Blog","LLM Journey"]
excerpt: ""
featuredImage: null
---
<pre class="wp-block-code"><code># PageSpeed Insights API - LangGraph Project Requirements

## Project Overview
A LangGraph-based workflow system that processes URLs from a CSV file, analyzes their performance using Google PageSpeed Insights API, leverages Google Gemini for intelligent analysis, and updates HubSpot contact records with the performance metrics.

## Functional Requirements

### 1. URL Import Node
- **Purpose**: Import and validate URLs from a CSV file
- **Input**: CSV file path containing URLs
- **Output**: List of validated URLs for processing
- **Validation**: Check URL format and accessibility

### 2. PageSpeed API Loop Node
- **Purpose**: Iterate through URLs and call PageSpeed Insights API
- **Input**: List of URLs from import node
- **Processing**: 
  - Call PageSpeed Insights API for each URL
  - Collect both mobile and desktop performance data
  - Handle API rate limiting and errors
- **Output**: Raw PageSpeed data for each URL

### 3. Data Parser Node
- **Purpose**: Extract relevant metrics from PageSpeed API responses
- **Input**: Raw PageSpeed API responses
- **Processing**:
  - Extract performance scores (mobile/desktop)
  - Extract loading time metrics
  - Extract Core Web Vitals
- **Output**: Structured performance data

### 4. Gemini Analysis Node
- **Purpose**: Analyze performance data using Google Gemini AI
- **Input**: Structured performance data
- **Processing**:
  - Generate performance insights
  - Identify optimization opportunities
  - Create performance summaries
- **Output**: AI-generated analysis and recommendations

### 5. CSV Export Node
- **Purpose**: Create comprehensive performance report
- **Input**: Analyzed performance data
- **Output**: CSV file with columns:
  - URL
  - Index Time (timestamp)
  - Mobile Performance Score
  - Desktop Performance Score
  - Load Time
  - AI Analysis Summary

### 6. HubSpot Integration Node
- **Purpose**: Update HubSpot contact records with performance data
- **Input**: Performance data mapped to contact records
- **Processing**:
  - Match URLs to HubSpot contacts
  - Update contact properties:
    - Website URL
    - Website Load Time
    - Mobile Page Speed Score
    - Desktop Page Speed Score
- **Output**: Updated HubSpot contact records

## Technical Requirements

### APIs and Services
- **Google PageSpeed Insights API**: Performance analysis
- **Google Gemini API**: AI-powered analysis
- **HubSpot API**: Contact record updates
- **LangGraph**: Workflow orchestration

### Data Flow
```
CSV Input → URL Import → PageSpeed API Loop → Data Parser → 
Gemini Analysis → CSV Export → HubSpot Update
```

### Error Handling
- API rate limiting management
- Network timeout handling
- Invalid URL handling
- HubSpot contact matching errors

### Performance Considerations
- Batch processing for large URL lists
- Concurrent API calls (within rate limits)
- Progress tracking and logging
- Resume capability for interrupted processes

## Project Structure

```
pagespeed_insights_project/
├── README.md
├── requirements.txt
├── config/
│   ├── __init__.py
│   ├── settings.py
│   └── api_keys.py
├── src/
│   ├── __init__.py
│   ├── main.py
│   ├── graph/
│   │   ├── __init__.py
│   │   ├── workflow.py
│   │   └── state.py
│   ├── nodes/
│   │   ├── __init__.py
│   │   ├── url_import_node.py
│   │   ├── pagespeed_api_node.py
│   │   ├── data_parser_node.py
│   │   ├── gemini_analysis_node.py
│   │   ├── csv_export_node.py
│   │   └── hubspot_integration_node.py
│   ├── services/
│   │   ├── __init__.py
│   │   ├── pagespeed_service.py
│   │   ├── gemini_service.py
│   │   └── hubspot_service.py
│   ├── models/
│   │   ├── __init__.py
│   │   ├── performance_data.py
│   │   └── workflow_state.py
│   └── utils/
│       ├── __init__.py
│       ├── csv_handler.py
│       ├── url_validator.py
│       └── logger.py
├── data/
│   ├── input/
│   │   └── urls.csv
│   └── output/
│       └── performance_report.csv
├── tests/
│   ├── __init__.py
│   ├── test_nodes/
│   ├── test_services/
│   └── test_utils/
└── logs/
    └── application.log
```

## File Descriptions

### Core Files
- **main.py**: Application entry point and workflow execution
- **workflow.py**: LangGraph workflow definition and node connections
- **state.py**: Workflow state management and data structures

### Node Classes
- **URLImportNode**: Handles CSV import and URL validation
- **PageSpeedAPINode**: Manages PageSpeed Insights API calls
- **DataParserNode**: Extracts and structures performance metrics
- **GeminiAnalysisNode**: AI-powered performance analysis
- **CSVExportNode**: Generates performance reports
- **HubSpotIntegrationNode**: Updates HubSpot contact records

### Service Classes
- **PageSpeedService**: PageSpeed Insights API client
- **GeminiService**: Google Gemini AI client
- **HubSpotService**: HubSpot API client

### Model Classes
- **PerformanceData**: Data structure for performance metrics
- **WorkflowState**: State management for LangGraph workflow

### Utility Classes
- **CSVHandler**: CSV file operations
- **URLValidator**: URL validation and sanitization
- **Logger**: Application logging and monitoring

## Configuration Requirements

### Environment Variables
```
GOOGLE_PAGESPEED_API_KEY=your_pagespeed_api_key
GOOGLE_GEMINI_API_KEY=your_gemini_api_key
HUBSPOT_API_KEY=your_hubspot_api_key
LOG_LEVEL=INFO
MAX_CONCURRENT_REQUESTS=5
API_RATE_LIMIT_DELAY=1
```

### Dependencies (requirements.txt)
```
langgraph>=0.1.0
langchain>=0.1.0
google-api-python-client>=2.0.0
google-generativeai>=0.3.0
hubspot-api-client>=7.0.0
pandas>=2.0.0
aiohttp>=3.8.0
pydantic>=2.0.0
python-dotenv>=1.0.0
pytest>=7.0.0
```

## Implementation Best Practices

### Code Organization
- Use class-based architecture for all components
- Implement dependency injection for services
- Follow SOLID principles
- Use type hints throughout the codebase

### Error Handling
- Implement comprehensive exception handling
- Use custom exception classes for specific error types
- Log all errors with appropriate context
- Implement retry mechanisms for API calls

### Testing Strategy
- Unit tests for all classes and methods
- Integration tests for API services
- End-to-end workflow testing
- Mock external API calls in tests

### Security Considerations
- Store API keys in environment variables
- Implement API key rotation capability
- Use HTTPS for all API communications
- Validate and sanitize all input data

### Performance Optimization
- Implement connection pooling for HTTP requests
- Use async/await for concurrent operations
- Implement caching for repeated API calls
- Monitor and log performance metrics

## Deliverables

1. **Source Code**: Complete implementation following the specified structure
2. **Documentation**: README with setup and usage instructions
3. **Configuration Files**: Environment setup and API configuration
4. **Test Suite**: Comprehensive test coverage
5. **Sample Data**: Example CSV files for testing
6. **Deployment Guide**: Instructions for production deployment

## Recommended Script Creation Order
1. Start with the Foundation (Utils + Config)
    Reason: Everything else depends on configuration and utilities.
    Files to create first:
      config/settings.py and config/api_keys.py → for managing .env and API keys
      src/utils/logger.py → standardized logging
      src/utils/url_validator.py → URL validation logic
      src/utils/csv_handler.py → read/write CSV

2. Build Models (Data Structures)
    Reason: Define the core objects your nodes/services will pass around.
    Files here:
      src/models/performance_data.py
      src/models/workflow_state.py (or src/graph/state.py depending on use)

3. Implement Services (External API Clients)

    Reason: Nodes will call these services. You need them ready first.
    Create in this order:
      src/services/pagespeed_service.py → fetch metrics
      src/services/gemini_service.py → AI insights
      src/services/hubspot_service.py → contact updates

4. Create Nodes (Workflow Steps)

    Reason: Each node uses your utils, models, and services.
    Suggested order (matches execution flow):
      url_import_node.py
      pagespeed_api_node.py
      data_parser_node.py
      gemini_analysis_node.py
      csv_export_node.py
      hubspot_integration_node.py

5. Assemble the Workflow (LangGraph)

    Files to do after nodes exist:
      src/graph/workflow.py (define graph, set edges/entry points)
      src/graph/state.py (holds workflow state)

6. Build the Entrypoint (Main App)

    src/main.py → ties everything together:
      Loads config
      Starts LangGraph
      Kicks off execution with urls.csv

7. Generate .env

    Using the values from the ### Environment Variables Section.


8. Validation &amp; Testing

    Create simple tests for each service/node (mock external calls).
    Ensure each node works before chaining them in the workflow.


## Instructions
1. **Zip File with Code**: Create a zip file with the directory and the files.  The files should just include the imports and the class definition.
2. **Recommended Script Creation Order**: Give me the recommendation on the order of how to create the scripts
3. **Code Generation instructions.**. Each code generation instruction should have its own zip file.
 **Code Generation instructions.** Generate the code for: Start with the Foundation (Utils + Config).
 **Code Generation instructions.** Build Models (Data Structures).
 **Code Generation instructions.** Implement Services (External API Clients).
 **Code Generation instructions.** Create Nodes (Workflow Steps).
 **Code Generation instructions.** Assemble the Workflow (LangGraph).
 **Code Generation instructions.** Build the Entrypoint main.py (Main App).
 **Code Generation instructions.** Generate .env file.
 **Code Generation instructions.** Validation &amp; Testing.
5.  
4. **Create a full README.md** for the entired project.

## Success Criteria

- Successfully process CSV files with 100+ URLs
- Achieve 95%+ success rate for PageSpeed API calls
- Generate accurate performance reports
- Successfully update HubSpot contact records
- Handle errors gracefully without workflow interruption
- Complete processing within reasonable time limits (&lt; 5 minutes per 100 URLs)
</code></pre>
