Port Performance Ontology & Data Modeling Project
Executive Summary
This project develops a comprehensive ontology for port performance data analysis based on UNCTAD Port Call and Performance Statistics. The ontology enables systematic analysis of port efficiency metrics across different economies and commercial markets, supporting strategic decision-making in maritime trade and logistics.
1. Project Objectives
Primary Goal
Develop an ontology that determines port performance at the economy level per commercial market, enabling:

Cross-economy port performance comparisons
Commercial market efficiency analysis
Vessel characteristics and operational insights
Time-based performance trends

Key Performance Indicators

Median Time in Port: Primary efficiency metric
Vessel Characteristics: Size, age, and type analysis
Commercial Market Performance: Sector-specific insights
Economy-level Benchmarking: Regional comparisons

2. Data Source Analysis
Primary Data Source
UNCTAD Port Call and Performance Statistics

URL: https://unctadstat.unctad.org/datacentre/dataviewer/US.PortCalls
Coverage: Global port performance data
Update Frequency: Annual/Semi-annual
Data Provider: MarineTraffic integration

Economy Classification
UNCTAD Economy Codes

Standard: ISO 3166-1 and UN M49 standards
Coverage: 195+ economies
Groupings: Geographic, development status, institutional membership

Core Data Fields
Field NameData TypeDescriptionBusiness SignificanceEconomyStringISO country codeGeographic identifierCommercialMarket_LabelStringMarket segment (Container, Bulk, etc.)Operational categorizationAverage_age_of_vessels_years_ValueFloatMean vessel age in yearsFleet modernization indicatorMedian_time_in_port_days_ValueFloatMedian port stay durationPrimary efficiency metricAverage_size_GT_of_vessels_ValueFloatMean vessel size (Gross Tonnage)Capacity utilizationMaximum_size_GT_of_vessels_ValueFloatLargest vessel sizeInfrastructure capability
3. Ontology Design
3.1 Core Object Types
Economy

Definition: Sovereign state or territorial unit with port facilities
Attributes:

economy_code (Primary Key)
economy_name
iso_alpha2_code
iso_alpha3_code
un_m49_code
region
subregion
development_status (Developed/Developing)
geographic_coordinates



Port

Definition: Maritime facility within an economy for vessel operations
Attributes:

port_id (Primary Key)
port_name
economy_code (Foreign Key)
port_type (Major/Minor/Regional)
latitude
longitude
operational_status



Commercial Market

Definition: Vessel type categorization for maritime trade operations
Attributes:

market_id (Primary Key)
market_label
market_description
vessel_type_category
cargo_type



Vessel

Definition: Individual ship or maritime transport unit
Attributes:

vessel_id (Primary Key)
vessel_name
imo_number
gross_tonnage
vessel_age
commercial_market_id (Foreign Key)
flag_state



Port Performance

Definition: Aggregated performance metrics for economy-market combinations
Attributes:

performance_id (Primary Key)
economy_code (Foreign Key)
commercial_market_id (Foreign Key)
reporting_period
median_time_in_port_days
average_vessel_age_years
average_vessel_size_gt
maximum_vessel_size_gt
total_port_calls
performance_score



Port Call

Definition: Individual vessel visit to a port
Attributes:

call_id (Primary Key)
vessel_id (Foreign Key)
port_id (Foreign Key)
arrival_date
departure_date
time_in_port_hours
call_purpose
cargo_volume



3.2 Relationship Types
Economy → Port Performance

Relationship: HAS_PORT_PERFORMANCE
Cardinality: One-to-Many
Description: Each economy exhibits performance across multiple commercial markets

Commercial Market → Port Performance

Relationship: MEASURED_IN
Cardinality: One-to-Many
Description: Performance metrics are segmented by commercial market

Economy → Port

Relationship: CONTAINS
Cardinality: One-to-Many
Description: Economies contain multiple port facilities

Port → Port Call

Relationship: RECEIVES
Cardinality: One-to-Many
Description: Ports receive multiple vessel calls

Vessel → Port Call

Relationship: MAKES
Cardinality: One-to-Many
Description: Vessels make multiple port calls

Commercial Market → Vessel

Relationship: CATEGORIZES
Cardinality: One-to-Many
Description: Vessels are categorized by commercial market type

4. Entity-Relationship Diagrams
4.1 Conceptual ER Diagram
[Economy] ──1:M── [Port Performance] ──M:1── [Commercial Market]
    │                     │
    │                     │
    │              [Performance Metrics]
    │                     │
    │                     │
[Port] ──1:M── [Port Call] ──M:1── [Vessel]
    │              │                  │
    │              │                  │
 [Location]    [Visit Details]  [Vessel Attributes]
4.2 Logical ER Diagram Details
Primary Entities:

Economy (economy_code, economy_name, region, development_status)
Commercial_Market (market_id, market_label, vessel_type)
Port_Performance (economy_code, market_id, median_time_days, avg_vessel_age)
Port (port_id, port_name, economy_code, coordinates)
Vessel (vessel_id, gross_tonnage, age, market_id)
Port_Call (call_id, vessel_id, port_id, arrival_date, departure_date)

Key Relationships:

Economy ||──o{ Port_Performance
Commercial_Market ||──o{ Port_Performance
Economy ||──o{ Port
Port ||──o{ Port_Call
Vessel ||──o{ Port_Call
Commercial_Market ||──o{ Vessel

5. Sample Dataset
5.1 Economy Sample Data
csveconomy_code,economy_name,iso_alpha2,iso_alpha3,region,development_status
CN,China,CN,CHN,Asia,Developing
US,United States,US,USA,Americas,Developed
DE,Germany,DE,DEU,Europe,Developed
SG,Singapore,SG,SGP,Asia,Developing
NL,Netherlands,NL,NLD,Europe,Developed
5.2 Commercial Market Sample Data
csvmarket_id,market_label,market_description,vessel_type_category
1,Container,Container vessel operations,Container Ship
2,Bulk Carrier,Dry bulk cargo transport,Bulk Carrier
3,Tanker,Liquid cargo transport,Tanker
4,General Cargo,Mixed cargo operations,General Cargo
5,Ro-Ro,Roll-on/Roll-off operations,Ro-Ro Ship
5.3 Port Performance Sample Data
csvperformance_id,economy_code,market_id,reporting_period,median_time_in_port_days,average_vessel_age_years,average_size_gt_vessels,maximum_size_gt_vessels,total_port_calls
1,CN,1,2023,1.2,12.5,85000,220000,45000
2,CN,2,2023,2.1,15.2,45000,180000,12000
3,US,1,2023,1.8,11.8,95000,240000,35000
4,US,2,2023,2.5,14.5,55000,200000,8000
5,DE,1,2023,1.5,10.2,75000,200000,25000
6,SG,1,2023,0.9,8.5,105000,260000,40000
7,NL,1,2023,1.3,9.8,88000,230000,30000
5.4 Port Sample Data
csvport_id,port_name,economy_code,port_type,latitude,longitude,operational_status
1,Shanghai,CN,Major,31.2304,121.4737,Active
2,Los Angeles,US,Major,33.7405,-118.2668,Active
3,Hamburg,DE,Major,53.5511,9.9937,Active
4,Singapore,SG,Major,1.2966,103.7764,Active
5,Rotterdam,NL,Major,51.9225,4.4792,Active
6. Palantir Foundry Implementation
6.1 Dataset Creation Strategy
Raw Data Ingestion

UNCTAD_Port_Performance_Raw

Direct API/CSV ingestion from UNCTAD
Schema validation and cleansing
Historical data retention


Economy_Reference_Data

ISO country codes and classifications
Geographic and economic groupings
Administrative metadata



Processed Datasets

Port_Performance_Clean

Validated and normalized performance metrics
Outlier detection and handling
Missing value imputation


Economy_Market_Performance

Aggregated performance by economy-market combination
Calculated performance scores and rankings
Time-series analysis capabilities
