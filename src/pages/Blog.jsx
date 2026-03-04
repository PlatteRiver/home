import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const SITE_URL = 'https://www.platte-river.com'

const Blog = () => {
  const [expandedPost, setExpandedPost] = useState(null)
  const [isVisible, setIsVisible] = useState({ blog: true })
  const blogRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('data-section-id')
            if (sectionId) setIsVisible((prev) => ({ ...prev, [sectionId]: true }))
        }
      })
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    )
    if (blogRef.current) {
      blogRef.current.setAttribute('data-section-id', 'blog')
      observer.observe(blogRef.current)
    }
    return () => observer.disconnect()
  }, [])

  const blogPosts = [
    {
      id: 4,
      title: 'Why GIS is Critical for Solar Energy Site Selection',
      author: 'Platte River Analytics',
      date: 'December 31, 2025',
      readTime: '4 min read',
      excerpt: 'Selecting the optimal location for a solar energy project is one of the most critical decisions in renewable energy development. GIS technology transforms this complex process from guesswork into data-driven precision.',
      content: `Selecting the optimal location for a solar energy project is one of the most critical decisions in renewable energy development. The success of a solar installation depends on numerous factors that must be carefully evaluated—from solar irradiance and land availability to environmental constraints and grid connectivity. Without the right tools and analysis, developers risk choosing suboptimal sites that can lead to reduced energy output, increased costs, or project delays.

GIS technology transforms this complex process from guesswork into data-driven precision. At Platte River Analytics, we've seen firsthand how spatial analysis can make or break a solar project's viability. In this article, we'll explore why GIS is indispensable for solar site selection and how it enables developers to make informed decisions that maximize both energy production and return on investment.

## The Complexity of Solar Site Selection

Solar site selection involves evaluating dozens of interconnected factors simultaneously. Traditional methods often rely on manual site visits, paper maps, and fragmented data sources, making it difficult to see the full picture. A site might appear perfect at first glance, but hidden constraints can emerge later in the development process—environmental restrictions, transmission line capacity limitations, or competing land uses that weren't initially apparent.

Consider a scenario where a developer identifies a large, flat parcel with good solar exposure. Without comprehensive GIS analysis, they might miss critical factors like flood zones, protected wildlife habitats, or proximity to airports that could require additional setbacks. These oversights can result in costly redesigns, permit denials, or even project cancellation after significant investment has been made.

GIS brings all these variables together in a single, visual platform, allowing analysts to overlay multiple data layers and identify potential conflicts before they become problems. This spatial intelligence is what separates successful solar projects from those that stall or fail.

## Key Factors GIS Analyzes for Solar Sites

GIS enables comprehensive analysis of the critical factors that determine solar project success:

- **Solar Resource Assessment**: GIS integrates solar irradiance data, sun path analysis, and shading models to identify areas with optimal solar potential. This includes analyzing seasonal variations, cloud cover patterns, and topographic influences on solar exposure.

- **Land Suitability Analysis**: Spatial analysis evaluates land use constraints, zoning regulations, parcel boundaries, and ownership patterns. GIS can quickly identify available parcels, assess their size and shape for optimal panel layout, and flag areas with development restrictions.

- **Environmental Constraints**: Critical habitat maps, wetlands, flood zones, and protected areas are overlaid to identify environmental sensitivities.

- **Infrastructure Proximity**: GIS analyzes distance to transmission lines, substations, and road networks. Proximity to existing infrastructure significantly impacts project economics.

- **Topographic Analysis**: Slope, aspect, and elevation data help determine site grading requirements and panel orientation.

- **Market and Demographic Factors**: Population density, energy demand patterns, and market pricing zones influence project economics.

## Real-World Impact on Project Success

The value of GIS in solar site selection becomes clear when examining real project outcomes. We've worked with solar developers who initially identified sites through traditional methods, only to discover through GIS analysis that alternative locations offered significantly better economics or fewer development risks.

In one recent project, a developer was considering a 500-acre site for a utility-scale solar installation. Our GIS analysis revealed several critical issues: a significant portion was in a 100-year floodplain, transmission line capacity was limited, and the site was adjacent to a protected wildlife corridor. By analyzing alternative sites within the same region, we identified a nearby location that avoided these constraints while reducing project development costs by approximately 15%.

## The Power of Multi-Criteria Analysis

One of GIS's greatest strengths is its ability to perform multi-criteria evaluation, weighting different factors according to project priorities. GIS models can assign weights to different criteria, creating suitability maps that highlight the most promising areas. This analytical approach ensures that site selection decisions are transparent, defensible, and aligned with project goals.

## Conclusion

GIS is not just a helpful tool for solar site selection—it's essential. The complexity of modern solar development demands spatial intelligence that can synthesize multiple data sources, identify constraints early, and optimize site selection for maximum project success.

If you're planning a solar development project and want to ensure you're selecting the optimal site, reach out to discuss how our GIS consulting services can support your site selection process.`,
      dashboardLink: null,
      category: 'Solar Energy',
      tags: ['Solar', 'Site Selection', 'GIS Analysis', 'Renewable Energy'],
    },
    {
      id: 3,
      title: 'Mastering Arcade in ArcGIS Pro and ArcGIS Online: Tips and Tricks for Better Maps and Insights',
      author: 'Andy Bohnhoff',
      date: 'October 30, 2024',
      readTime: '4 min read',
      excerpt: 'Arcade is an incredibly versatile scripting language within the ArcGIS ecosystem, enabling you to perform custom calculations, manipulate data, and create dynamic visualizations in both ArcGIS Pro and ArcGIS Online.',
      content: `Arcade is an incredibly versatile scripting language within the ArcGIS ecosystem, enabling you to perform custom calculations, manipulate data, and create dynamic visualizations in both ArcGIS Pro and ArcGIS Online. From creating dynamic label expressions to customizing popup content, Arcade allows you to expand your GIS data displays in ways that are both informative and visually appealing. Here are some tips and tricks to get the most out of Arcade in your projects.

## 1. Using Arcade for Dynamic Label Expressions

Labels are a powerful tool in map-making, providing context without cluttering the map. Arcade offers the flexibility to create customized label expressions that go beyond the basics.

**Conditional Labels:** Let's say you want to display different labels based on the type of road or landmark. With Arcade, you can write a conditional expression to adjust labels dynamically:

\`\`\`
var roadType = $feature.Road_Type;
if (roadType == "Highway") {
  return "HWY: " + $feature.Road_Name;
} else if (roadType == "Local") {
  return "Local Rd: " + $feature.Road_Name;
} else {
  return $feature.Road_Name;
}
\`\`\`

**Dynamic Units in Labels:** If you have a layer showing distances or areas and want to automatically adjust the units, Arcade can help:

\`\`\`
var area = $feature.Area;
if (area > 1000000) {
  return Round(area / 1000000, 2) + " sq mi";
} else {
  return Round(area, 2) + " sq ft";
}
\`\`\`

## 2. Customizing Pop-ups with Arcade

Pop-ups in ArcGIS Online allow you to communicate complex information in an interactive way. With Arcade, you can make pop-ups more insightful by calculating values on the fly.

**On-the-Fly Calculations:** For example, mapping property data and showing price per square foot:

\`\`\`
var price = $feature.Total_Price;
var area = $feature.Area;
if (area > 0) {
  return "$" + Text(price / area, "#,###.##") + " per sq ft";
} else {
  return "N/A";
}
\`\`\`

**Customize Charts, Graphs, and Icons:** For population data across age groups, create an Arcade expression that returns an array for bar chart generation:

\`\`\`
var young = $feature.Age_0_14;
var adult = $feature.Age_15_64;
var senior = $feature.Age_65_and_over;
return [young, adult, senior];
\`\`\`

## 3. Calculating New Fields Without Altering the Data

Arcade expressions can create virtual fields that only exist in the map view without changing the source data.

**Derive Annual Revenue:** Sum monthly fields in real-time without pre-calculating:

\`\`\`
return $feature.Jan_Revenue + $feature.Feb_Revenue + $feature.Mar_Revenue +
       $feature.Apr_Revenue + $feature.May_Revenue + $feature.Jun_Revenue +
       $feature.Jul_Revenue + $feature.Aug_Revenue + $feature.Sep_Revenue +
       $feature.Oct_Revenue + $feature.Nov_Revenue + $feature.Dec_Revenue;
\`\`\`

## Data Transformation and Parsing

Arcade also allows you to manipulate text and numeric data directly. For example, parsing city from an address:

\`\`\`
var address = $feature.Address;
var splitAddress = Split(address, ",");
return splitAddress[1];
\`\`\`

## Conclusion

Arcade's versatility brings a new level of customization to GIS work in ArcGIS Pro and ArcGIS Online. By combining data conversions, conditional formatting, and dynamic calculations, you can alter label expressions, pop-up content, symbology, and calculations to match your specific needs. Arcade allows GIS professionals to unlock powerful, real-time insights without altering the underlying data.`,
      dashboardLink: null,
      category: 'ArcGIS Tips',
      tags: ['Arcade', 'ArcGIS Pro', 'ArcGIS Online', 'Labels', 'Pop-ups'],
    },
    {
      id: 2,
      title: 'Building a Solar Site Selection App in ArcGIS Online',
      author: 'Andy Bohnhoff',
      date: 'August 8, 2024',
      readTime: '4 min read',
      excerpt: 'Need a site selection application that also allows your team to enter notes, create customized spatial layers, access thousands of layers, and have dozens of analysis tools at your fingertips? ArcGIS Online is the right solution for you!',
      content: `There are dozens of web apps utilized by solar developers to assist with site selection. The biggest problem we see with these apps? They are not customizable and not a viable enterprise GIS solution. Need a site selection application that also allows your team to enter notes, create customized spatial layers, access thousands of layers, and have dozens of analysis tools at your fingertips? ArcGIS Online is the right solution for you!

## Getting Started with Parcel Data

The first key to site selection analysis, especially in the solar and wind industries, is reliable parcel data. Within ArcGIS Online, we have access to parcel data from hundreds of counties, and also a handful of states. Texas, for example, has statewide parcel data that is accessible for free through ArcGIS Online.

To get started, open a new AGOL map and add a few layers that will be useful for our analysis. In this example, we are going to add:

- County parcel data
- Substation layer
- USA Flood Hazards layer (from Living Atlas)

Both the county parcel data and the flood hazards layer were accessed through the Add Data button in the web map and the substation layer was published from ArcGIS Pro.

## Building the Experience Builder App

Feel free to add as many layers as necessary. After you add layers, save the web map and then share as an Experience Builder app to the rest of your organization.

If you are unfamiliar with ArcGIS Online and their app builders, there are 4 options when creating an application:
- **Instant Apps** gives you access to a couple dozen "out of the box" applications
- **Experience Builder** is a customizable app builder for custom web mapping applications
- **Story Maps** allow you to tell stories with maps
- **Dashboards** allow you to share Key Performance Indicators

## Setting Up Analysis Widgets

After selecting an Experience Builder template, add the Analysis widget to your widget toolbar. In the analysis tool setup, add a Spatial analysis tool. Three tools that are useful for site selection analysis:

- **Summarize Nearby** - analyze features within a distance
- **Summarize Within** - aggregate data within boundaries
- **Find by Attributes and Location** - query by both attributes and spatial relationships

For each of these tools, enable "Add Result Layers to Map Automatically" and "Allow Export".

## Running Your Analysis

Preview your app and zoom in on your county parcel and substation layers. Test the Find by Attributes and Location widget, using parcels as input and substations as comparison. Build a query that selects all parcels greater than 45 acres AND within 2 miles of a substation—combining both attribute and spatial expressions in the same query.

The output layer is automatically added to the map. In our example, 93 parcels met our spatial and attribute expression.

## Taking It Further

From here, you can take your GIS analysis even further by examining additional factors like floodplains, wetlands, transmission lines, oil and gas pipelines, slope, and more. With the output layer automatically added to your web map, you gain immediate access to its attribute table, allowing for deeper spatial analysis.

ArcGIS Online makes it easy to iterate on your analysis, ensuring you consider every relevant factor before making critical decisions. Whether you're working in solar development or any other industry that requires precise spatial analysis, this approach gives you the flexibility and power you need.`,
      dashboardLink: null,
      category: 'Solar Energy',
      tags: ['Solar', 'ArcGIS Online', 'Site Selection', 'Experience Builder'],
    },
    {
      id: 1,
      title: 'Automating Land Ownership Change Detection with Python and Esri Dashboards',
      author: 'Andy Bohnhoff',
      date: 'April 7, 2025',
      readTime: '3 min read',
      excerpt: 'In the energy and real estate worlds, monitoring land ownership changes is essential. Without effective tracking, organizations risk losing critical insights that can influence major decisions.',
      content: `In the energy and real estate worlds, monitoring land ownership changes is essential. Without effective tracking, organizations risk losing critical insights that can influence major decisions. Recently at Platte River Analytics, we were presented with a problem by a real estate client where land ownership within their AOI was changing hands often and quickly.

So we set out to develop a Python script and Esri dashboard that automates the identification of changes in county parcel data, which in turn enhanced their data analysis capabilities. In this article, we'll share our journey and the benefits the tools bring to GIS projects.

## Understanding the Challenge

Tracking changes in land ownership is complicated and time-consuming. Traditional methods, which often involve manual comparisons of datasets, can lead to errors. For instance, imagine analyzing 20 parcels involved in transactions linked to a new wind farm project. If any changes go unnoticed, the consequence can be considerable, resulting in missed opportunities or misguided investments.

County parcel data is constantly evolving—landowners sell, split, and acquire parcels regularly. But for analysts, tracking these changes manually across hundreds or thousands of records is time-consuming and prone to error. Even subtle changes like a new mailing address or a slight shift in acreage can indicate important updates, such as ownership transfers or parcel splits. Without automation, teams spend hours comparing records line by line, or worse, they miss key changes altogether.

## Innovative Solution

To solve this, we built a custom Python script that automatically detects changes in parcel data. The script can be run daily, weekly, or monthly and flags parcels with differences in:

- **Landowner names**: Recognizing when a parcel changes hands
- **Mailing address updates**: Ensuring correct communication with the current owners
- **Parcel size alterations**: Noting any splits or expansions in ownership

If any changes are detected regarding parcel size, such as a split resulting in multiple new plots, the script flags these alterations immediately.

## Interactive Esri Dashboard

Once changes are detected, they're visualized in an interactive dashboard we built for our clients. The dashboard includes:

- A top-left indicator showing how many parcels have changed in the selected time period
- A detailed change list showing each updated parcel with key attributes
- A map view with changed parcels highlighted for fast visual analysis
- An attribute table beneath the map for filtering and sorting

This makes it incredibly easy to scan for changes and drill into the details—no more spreadsheet flipping or manual comparisons.

## Real-World Applications in Energy Projects

While this tool is useful for general land monitoring, it's especially powerful in the energy sector:

- **Oil & Gas**: Use it with a layer of mineral units to track newly assigned operators or with a permits layer to visualize new permits taken in specific areas.
- **Solar Development**: Detect when new parcels have changed hands, indicating a possible new project site.
- **Wind Energy**: Monitor parcels or new wind turbines near your developments for early indicators of new activity.

## Looking Forward

We're currently working on integrating this script with Microsoft Power Automate. The goal is to send automated alerts via email when parcel changes are detected—right to your team's inbox. That means no need to even open the dashboard unless something's changed.

Ultimately, this project reflects our broader mission at Platte River Analytics: to automate data workflows and surface insights before you even know you need them.

If you're interested in learning how this tool can be adapted to your data or workflow, reach out. We'd love to show you a demo and talk use cases.`,
      dashboardLink: 'https://www.arcgis.com/apps/dashboards/7f569e32143e4aacadb50177de5f92b2',

      category: 'Automation & Workflow',
      tags: ['Python', 'Esri', 'Dashboard', 'Land Records', 'Automation'],
    },
    {
      id: 5,
      title: 'Transitioning to ArcGIS Pro: Enhancing Your GIS with Advanced Tools and Features',
      author: 'Andy Bohnhoff',
      date: 'June 26, 2024',
      readTime: '3 min read',
      excerpt: 'As the official retirement of ArcMap approaches in Q1 of 2026, companies still utilizing this legacy platform face a critical juncture. It is essential for organizations to quickly and efficiently transition to ArcGIS Pro.',
      content: `As the official retirement of ArcMap approaches in Q1 of 2026, companies still utilizing this legacy platform face a critical juncture. ArcGIS 10.8.2, the current and final update of ArcMap, marks the end of an era. It is essential for organizations to quickly and efficiently transition to ArcGIS Pro, which offers a range of advanced features and capabilities that significantly enhance geospatial workflows and outcomes.

At Platte River Analytics, we take pride in our Esri training courses. Whether it's an Introduction to ArcGIS Pro, or creating your first app in Experience Builder, we have the experience and expertise to assist your organization in the momentous shift to ArcGIS Pro.

Below are some reasons why investing in ArcGIS Pro training is crucial for your company.

## Enhanced GIS Data Sharing and Publishing Capabilities

ArcGIS Pro makes sharing and publishing organizational data seamless. With Pro, users can easily share web maps and web scenes within their AGOL or Portal organization, fostering a collaborative and integrated environment. This streamlined data sharing capability ensures that all stakeholders have access to the most up-to-date and accurate information. Pro also allows for simultaneous editing, which allows users to collaboratively edit in both Pro and AGOL.

## Advanced ArcGIS Visualization Tools

ArcGIS Pro excels in providing sophisticated 2D and 3D visualization tools. These tools include interactive graphics and the ability to edit analysis parameters on-the-fly, offering users a dynamic and intuitive experience. Pro also allows for 3D scene publishing, which allows users to publish both their 3D data and web scenes to a web environment.

## Superior Collaboration Features

One of the standout features of ArcGIS Pro is its ability to facilitate better collaboration among colleagues. The platform supports concurrent edits and updates, ensuring that team members can work together efficiently without the risk of data conflicts. This collaborative environment promotes a more cohesive workflow, leading to improved project outcomes.

## Robust Performance and Processing Power

ArcGIS Pro's 64-bit architecture and multi-threaded processing capabilities translate into significantly faster analysis and rendering compared to ArcMap. This powerful architecture allows users to handle larger datasets and perform more complex spatial analyses with ease. The result is a substantial improvement in productivity and the ability to tackle more ambitious projects.

## State-of-the-Art Cartography Tools

ArcGIS Pro offers cutting-edge cartography tools that surpass the capabilities of ArcMap. Features such as smart mapping, multi-attribute symbology, and flexible labeling and annotation options provide users with the tools needed to create highly detailed and aesthetically pleasing maps.

## Project-Centric Approach

The project-centric approach of ArcGIS Pro is a game-changer for project management. All maps, layouts, tools, geodatabases, and connections are maintained within a single project file. This centralized system simplifies project organization and management, reducing the risk of errors.

## Preparing for the Future

Investing in ArcGIS Pro training now ensures that your organization is prepared for the future. As ArcMap approaches its retirement, it is crucial to transition to a platform that will continue to be supported and updated. ArcGIS Pro represents the future of GIS technology, offering ongoing improvements and innovations.

## Conclusion

Transitioning from ArcMap to ArcGIS Pro is not just a necessity due to the impending retirement of ArcMap; it is an opportunity to elevate your organization's GIS capabilities. The advanced features, enhanced performance, and superior collaboration tools offered by ArcGIS Pro make it a clear choice for any organization looking to stay competitive in the geospatial field.

Let the experienced team at Platte River Analytics help you customize your next Esri training.`,
      dashboardLink: null,
      category: 'Training & Education',
      tags: ['ArcGIS Pro', 'ArcMap', 'Migration', 'Training'],
    },
    {
      id: 6,
      title: 'Why GIS is the Key to Successful Energy Project Planning',
      author: 'Andy Bohnhoff',
      date: 'June 21, 2024',
      readTime: '3 min read',
      excerpt: 'GIS tools such as ArcGIS Pro and ArcGIS Online have emerged as pivotal tools in land acquisition strategies, offering unparalleled capabilities in data analysis, visualization, and spatial decision-making.',
      content: `In the world of energy project development, GIS tools such as ArcGIS Pro and ArcGIS Online have emerged as a pivotal tool in land acquisition strategies. Esri technology offers unparalleled capabilities in data analysis, visualization, and spatial decision-making, making it important for optimizing site selection, ensuring regulatory compliance, and stakeholder engagement.

By integrating spatial data such as topography, land use, and infrastructure proximity, GIS enables energy project planners to identify the most suitable locations, minimizing environmental impact and maximizing efficiency. Dynamic GIS dashboards also play a critical role, offering executives real-time insights into project statuses and key performance indicators (KPIs).

## 1. GIS Site Selection

GIS enables precise site selection by integrating various data layers such as topography, soil types, land use, and proximity to infrastructure like roads and power lines. This helps identify the most suitable locations for energy projects, optimizing for factors like solar radiation for solar projects, wind patterns for wind farms, or proximity to water sources for hydroelectric plants. GIS can also assess environmental constraints, avoiding areas with high conservation value or legal restrictions.

## 2. Accurate Legal GIS Descriptions

Mapping out accurate legal descriptions is crucial in the land acquisition process. GIS provides detailed spatial data and cadastral maps that outline property boundaries, ownership, and land tenure information. This ensures that legal documents are precise, reducing the risk of disputes and ensuring compliance with local land use regulations.

## 3. Viewing Parcel Data

GIS allows for the visualization and analysis of parcel data, which includes information on land ownership, property values, and zoning laws. This data is essential for negotiating land deals, assessing the financial feasibility of a project, and understanding the local property market dynamics.

## 4. Distance to Other Projects

For energy projects, proximity to other energy infrastructure is often a key consideration. GIS can map out the distance to existing projects, such as power plants, substations, and transmission lines, facilitating the efficient integration of new projects into the existing energy grid. This helps in reducing transmission losses and infrastructure costs.

## 5. Viewing Key Stakeholders

Identifying and mapping key stakeholders is an integral part of the land acquisition strategy. GIS can highlight the locations and interests of stakeholders such as landowners, local communities, regulatory agencies, and environmental groups.

## 6. Regulatory Compliance

Energy projects must comply with numerous regulatory requirements. GIS helps ensure compliance by overlaying regulatory data such as protected areas, zoning laws, and environmental restrictions onto project maps. This allows project planners to identify potential regulatory hurdles early in the planning process.

## 7. Dynamic Dashboards for KPI Monitoring

Keeping dynamic dashboards to view Key Performance Indicators (KPIs) is crucial for executives who need a quick and comprehensive overview of project statuses. GIS-based dashboards can display real-time data on land acquisition progress, regulatory compliance, stakeholder engagement, and project milestones.

In conclusion, land acquisition is a complex process that benefits greatly from the use of GIS technology. GIS provides detailed mapping and spatial analysis, making it easier to balance development needs with other factors such as regulatory and stakeholder engagement. Moving forward, integrating GIS into land acquisition processes can enhance transparency and collaboration among governments, businesses, and communities.`,
      dashboardLink: null,
      category: 'Energy',
      tags: ['Energy', 'Site Selection', 'Land Acquisition', 'Dashboards'],
    },
    {
      id: 7,
      title: 'Powering Up: GIS in Renewable Energy Site Analysis',
      author: 'Andy Bohnhoff',
      date: 'June 18, 2024',
      readTime: '3 min read',
      excerpt: 'Using GIS for site analysis reports in renewable energy projects is essential for ensuring project success and sustainability. Esri\'s ArcGIS Pro and ArcGIS Online enable comprehensive land assessments and regulatory compliance.',
      content: `Using GIS for site analysis reports in renewable energy projects is essential for ensuring project success and sustainability. With tools like Esri's ArcGIS Pro for desktop mapping and ArcGIS Online for web mapping, renewable energy developers can perform comprehensive land assessments, enhance stakeholder communication, and ensure regulatory compliance.

These advanced GIS platforms enable detailed analysis of land characteristics, topography, and environmental factors, helping to identify the most suitable sites for renewable energy installations. By integrating spatial data, GIS helps in planning infrastructure efficiently, optimizing resource placement, and minimizing environmental impact.

GIS also plays a critical role in landowner outreach, providing precise maps that facilitate communication and negotiations. Regulatory compliance is streamlined through GIS by clearly delineating regulatory zones and ensuring projects adhere to all legal requirements.

## Key Benefits of GIS in Renewable Energy

- **Accurate Land Assessment**: GIS provides detailed analysis of land characteristics, such as topography, soil types, and vegetation cover, helping determine site suitability for renewable energy projects.

- **Landowner Outreach**: GIS maps facilitate the identification and communication with landowners, ensuring efficient and clear outreach efforts essential for securing land use agreements.

- **Regulatory Compliance**: GIS helps in mapping out regulatory zones and constraints, ensuring that the project complies with local, state, and federal regulations, streamlining the permitting process.

- **Environmental Impact Reports**: GIS enables detailed environmental impact assessments by mapping sensitive areas, habitats, and protected zones, helping to minimize the environmental footprint.

- **Stakeholder Relations**: Visual GIS maps improve communication with stakeholders by providing clear, easily understandable information about the project, fostering transparency and trust.

- **Accurate Legal Descriptions**: GIS ensures precise legal descriptions of land parcels, critical for property rights, leases, and easements, reducing the risk of legal disputes.

- **Mapping Rights of Way**: GIS helps in planning and mapping rights of way for access roads, transmission lines, and other infrastructure, optimizing layout and minimizing land use conflicts.

- **Resource Optimization**: GIS aids in analyzing spatial data to optimize the placement of renewable energy installations, ensuring maximum efficiency and energy production.

- **Risk Management**: GIS identifies potential risks, such as flood zones, seismic activity, or land use conflicts, allowing for proactive risk mitigation strategies.

- **Historical Data Integration**: GIS can incorporate historical land use data and trends, helping to predict future land use changes and assess long-term project viability.

By leveraging advanced tools like ArcGIS Pro and ArcGIS Online, renewable energy developers can achieve unparalleled precision in land assessments, regulatory compliance, and stakeholder communication. As the renewable energy industry continues to grow, the importance of GIS in guiding these projects to success cannot be overstated.`,
      dashboardLink: null,
      category: 'Renewable Energy',
      tags: ['Renewable Energy', 'Site Analysis', 'ArcGIS', 'Environmental'],
    },
    {
      id: 8,
      title: 'From Data to Decisions: Why GIS Should Lead Your ROW Strategy',
      author: 'Andy Bohnhoff',
      date: 'March 19, 2024',
      readTime: '4 min read',
      excerpt: 'In infrastructure development, where every decision is pivotal and every inch of land counts, GIS is a crucial step in the strategic planning and execution of Right of Way projects.',
      content: `In the role of infrastructure development, where every decision is pivotal and every inch of land counts, the role of GIS cannot be overstated. Particularly in Right of Way (ROW) projects, where the alignment of pipelines, transmission lines, and transportation corridors can make or break the success of an endeavor, GIS is an important and crucial step.

From the initial stages of planning to the detailed work of buying land and regulatory restrictions, GIS is the key tool guiding our decisions.

## Transforming Data into Actionable Projects

Transforming spatial and tabular data into actionable ROW strategy is essential for project success. Spatial data, such as parcel boundaries and environmental features, provides the geographical context necessary for route optimization and land assessment. Tabular data, including ownership information and regulatory requirements, offers crucial insights into land rights and legal constraints.

By integrating these datasets through GIS, stakeholders can identify optimal routes, assess land suitability, and navigate regulatory complexities, laying the groundwork for informed decision-making and effective ROW strategy execution.

Local municipalities and counties often maintain valuable datasets related to zoning regulations, land use planning, property assessments, and infrastructure networks. GIS, and specifically ArcGIS Pro and ArcGIS Online, facilitates the integration of these dynamic datasets into ROW management workflows, providing up-to-date information on land development activities, regulatory changes, and potential conflicts with planned projects.

## Web Mapping Applications and Dashboards

Web mapping applications and dashboards play a pivotal role in ROW management by providing stakeholders with informative tools for KPI tracking, visualization, analysis, and collaboration. These applications allow users to interactively explore parcel boundaries and communicate project updates in real-time.

Web mapping applications and dashboards enable stakeholders by providing them with timely and accurate GIS information and statuses. This enhances transparency, facilitates informed decision-making, and promotes stakeholder engagement at every stage of the ROW management process.

## Factoring in Regulatory and Environmental Data

Access to regulatory and environmental data is vital for the success of any GIS and ROW project. Regulatory information, such as floodplain maps, wetland delineations, protected areas, and endangered species habitats, provides critical insights into the legal and environmental constraints that may affect project planning and execution.

Through Esri's ArcGIS platform, users can leverage a wide range of tools and resources to integrate regulatory and environmental data into their ROW projects. Esri's Living Atlas, a curated collection of authoritative GIS data, serves as a valuable resource for accessing up-to-date and high-quality data sets relevant to ROW management.

Living Atlas offers a host of GIS data layers, gathering regulatory information from trusted organizations and government agencies across the globe. Among our top picks from Living Atlas for ROW management are Slope, Tree Cover, Wetlands, and Floodplains.

## GIS Mapping the Path for ROW Projects

In summary, GIS serves as a crucial step in the strategic planning and execution of ROW projects, offering access to data integration, analysis, and visualization. By offering regulatory and environmental data, platforms such as Esri's ArcGIS and Living Atlas enable team members and public stakeholders to navigate complex ROW projects more effectively.

By leveraging these resources, companies can optimize route selection, mitigate environmental risks, and ensure compliance with regulatory requirements. Ultimately, by embracing Esri technology and leveraging authoritative data sources, ROW projects can achieve their objectives while upholding the high standards of environmental responsibility and regulatory compliance.`,
      dashboardLink: null,
      category: 'Infrastructure',
      tags: ['ROW', 'Infrastructure', 'Pipelines', 'ArcGIS', 'Living Atlas'],
    },
    {
      id: 9,
      title: 'Navigating the Landscape: The Vital Role of GIS in Land Management and Records',
      author: 'Andy Bohnhoff',
      date: 'February 21, 2024',
      readTime: '4 min read',
      excerpt: 'GIS isn\'t merely a fancy mapping tool but an indispensable asset in the dynamic realm of land management and records. The days of relying solely on paper maps and manual record-keeping are over.',
      content: `In this article, we will explore why GIS isn't merely a fancy mapping tool but an indispensable asset in the dynamic realm of land management and records.

## GIS Provides Interactive and Dynamic Capabilities

In the field of land management and cadastral records, field agents and office staff armed with GIS tools become much better armed, navigating the data and updates with precision and purpose.

The days of relying solely on paper maps and manual record-keeping are replaced by a dynamic and interactive mapping application that serves as a guide for those making decisions with our land.

The true ability of GIS lies in its ability to combine layers of information, transforming raw data into visual products. Field agents, equipped with tablets or smartphones, can access interactive maps and data that not only displays the topography but also overlays crucial information such as land boundaries, infrastructure details, land owners, and ecological features.

This real-time, dynamic mapping experience empowers them to make informed decisions on the spot, fostering efficiency and reducing the margin for error.

## GIS is an Important Step in Maintaining Cadastral Data

One of the cornerstones of effective land management is the maintenance of cadastral data — a detailed record of land parcels, boundaries, and ownership. In the past, cadastral data was static, confined to dusty shelves in government offices. However, with GIS, cadastral data becomes a vibrant and living entity, constantly updated and easily accessible to those who need it.

Dynamic cadastral data is essential to the maintenance of land records. The ability to interact with and manipulate cadastral data through GIS not only streamlines administrative processes but also ensures that the records are accurate and up-to-date. Field agents, supported by GIS, can update cadastral information in real-time, reflecting changes in ownership, land use, and boundaries with unparalleled precision.

Consider a scenario where a land parcel undergoes a change in ownership or a modification in its boundaries. Through GIS, these alterations are seamlessly integrated into the cadastral data, leaving no room for ambiguity or confusion. This not only enhances the overall transparency of land records but also serves as a testament to the adaptability and resilience of GIS in an ever-changing landscape.

## GIS as a Tool for Public Engagement and Transparency

A dynamic and interactive GIS plays a pivotal role in fostering public engagement and transparency, particularly in the context of land and cadastral data.

Dynamic and interactive GIS platforms provide the public with accessible and user-friendly tools to explore, visualize, and understand land and cadastral data. By making this information readily available, individuals, community groups, and businesses can gain insights into land usage, property boundaries, and development plans, empowering them with knowledge about their surroundings.

By providing a dynamic view of cadastral data, GIS can also help prevent disputes related to property boundaries and land use. Public access to accurate and up-to-date information can mitigate conflicts and facilitate the resolution of concerns.

In essence, a dynamic and interactive GIS transforms land and cadastral data from mere records into a shared resource, fostering a culture of transparency, collaboration, and informed decision-making among the public and GIS professionals alike.`,
      dashboardLink: null,
      category: 'Land Management',
      tags: ['Land Records', 'Cadastral', 'GIS', 'Public Engagement'],
    },
    {
      id: 10,
      title: 'Utilizing AI and GIS in the Energy Industry',
      author: 'Andy Bohnhoff',
      date: 'January 15, 2024',
      readTime: '3 min read',
      excerpt: 'The intersection of Artificial Intelligence and Geographic Information Systems has ushered in a new era, transforming the way businesses harness spatial data in the solar and oil and gas sectors.',
      content: `The intersection of Artificial Intelligence (AI) and Geographic Information Systems (GIS) has ushered in a new era of possibilities, transforming the way businesses and industries harness spatial data. In this article, we will explore how Platte River Analytics is leveraging AI and Machine Learning (ML) to revolutionize the GIS landscape, with a specific focus on groundbreaking applications in the solar and oil and gas sectors.

## Solar Site Selection using AI in GIS

Platte River Analytics has recently harnessed the power of AI to assist solar clients in identifying optimal locations for solar installations in major cities. By employing Esri's Segment Anything Model (SAM), which utilizes both Grounding DINO and Segment Anything Model, the process is streamlined through free-form text prompts.

Grounding DINO acts as an open-set object detector, finding objects based on text prompts, while the Segment Anything Model is employed to segment objects within a specified region of interest represented by bounding boxes or points.

In practical terms, this means that solar clients can input text descriptions such as "parking lots" or "solar panels on rooftops" and the AI model will extract features, generate masks, and convert them into GIS features. The resulting information helps solar companies efficiently identify suitable locations for solar panels, considering factors like available open space and sunlight exposure.

## Oil and Gas Industry Revolution: Aerial Site Inventory

Platte River Analytics is currently evaluating the application of Esri's Segment Anything Model in the oil and gas industry, with a focus on detecting well pads and equipment. This innovative approach involves using free-form text prompts to initiate the model, enabling the extraction of features within specified regions of interest.

Aerial imagery and AI models allow for real-time or periodic monitoring of oil and gas sites without the need for physical presence. Drones equipped with high-resolution cameras or satellite imagery can capture detailed visuals of the entire site, providing up-to-date information on infrastructure, equipment, and changes in the landscape.

A couple other useful applications within the oil and gas industry are change detection and infrastructure monitoring. Aerial imagery enables the detection of changes or anomalies in the infrastructure over time. This can be crucial for identifying potential issues, such as equipment malfunctions, leaks, or unauthorized activities, allowing for swift corrective action.

By leveraging aerial imagery and machine learning technologies, the oil and gas industry can enhance operational efficiency, reduce costs, and improve overall safety and environmental compliance. Automation of inventory-related tasks further frees up workers for more strategic and value-added activities while minimizing the risks associated with manual data collection in the field.`,
      dashboardLink: null,
      category: 'AI & Machine Learning',
      tags: ['AI', 'Machine Learning', 'Solar', 'Oil & Gas', 'Esri SAM'],
    },
    {
      id: 11,
      title: 'Deep Learning Model Unlocks Potential of Solar Energy Development',
      author: 'Andy Bohnhoff',
      date: 'December 15, 2023',
      readTime: '2 min read',
      excerpt: 'Platte River Analytics is revolutionizing the identification of solar energy sites through the innovative application of GIS machine learning, discovering dozens of ideal sites for a Colorado solar developer.',
      content: `In the pursuit of sustainable energy solutions, the combination of cutting-edge GIS technology and environmental stewardship has become a defining factor. Platte River Analytics, at the forefront of this intersection, is revolutionizing the identification and development of solar energy sites through the innovative application of GIS machine learning.

A recent collaboration with a Colorado solar developer has resulted in discovering dozens of ideal solar energy sites that promise to transform the landscape of solar energy development.

## Esri's Deep Learning Model

Esri's deep learning model, featured in Esri's ArcUser article titled "Deep Learning Model Unlocks Potential of Solar Energy Development," showcases how Platte River leverages pre-built machine learning models to discover and optimize solar energy sites.

This groundbreaking approach not only enhances the efficiency of renewable energy projects but also showcases the synergy between advanced analytics and environmental sustainability.

In practical terms, this means that solar clients can input text descriptions and the AI model will extract features, generate masks, and convert them into GIS features. The resulting information helps solar companies efficiently identify suitable locations for solar panels, considering factors like available open space and sunlight exposure.

To read the full article, visit the Esri ArcNews feature: [Deep Learning Model Unlocks Potential of Solar Energy Development](https://www.esri.com/about/newsroom/arcnews/deep-learning-model-unlocks-potential-of-solar-energy-development/).`,
      dashboardLink: null,
      category: 'AI & Machine Learning',
      tags: ['Deep Learning', 'Solar', 'Machine Learning', 'Esri', 'ArcNews'],
    },
    {
      id: 12,
      title: 'Using GIS in Carbon Capture and Storage Projects',
      author: 'Andy Bohnhoff',
      date: 'December 7, 2023',
      readTime: '3 min read',
      excerpt: 'We get asked often how GIS and Esri tools can be utilized in carbon capture and storage projects. Here are several reasons why an interactive GIS should be used for almost all aspects of a CSS project.',
      content: `We get asked often how GIS and Esri tools can be utilized in carbon capture and storage (CSS) projects. Below are several reasons why an interactive GIS should be used for almost all aspects of a CSS project — from initial site analysis to stakeholder engagement and regulatory compliance.

## 1. Site Selection and Characterization

- **Geological Assessment**: GIS can be used to analyze geological data to identify suitable sites for carbon storage. Factors such as rock type, porosity, and permeability can be assessed spatially to determine the feasibility of storing carbon dioxide underground.

- **Risk Assessment**: GIS helps in evaluating potential risks associated with carbon storage sites, such as proximity to fault lines, existing infrastructure, or environmentally sensitive areas.

- **Ideal Site Analysis**: ModelBuilder in ArcGIS Pro can be a powerful tool for identifying and acquiring the ideal site for development. Model factors such as slope, distance to power, tree cover, and wetland analysis.

## 2. Pipeline Routing and Planning

- **Optimal Routing**: GIS can be employed to find the most efficient and cost-effective routes for pipelines to transport carbon dioxide from capture sources to storage sites.

- **Land Use Planning**: GIS allows for the assessment of land use along the pipeline route, helping to avoid conflicts with existing infrastructure, communities, and environmentally sensitive areas.

## 3. Monitoring and Verification

- **Remote Sensing**: GIS, along with remote sensing technologies, can be used for continuous monitoring of storage sites. This includes the detection of any potential leaks, changes in land use, or alterations in vegetation health.

- **Spatial Data Integration**: GIS helps integrate various data sources, such as satellite imagery, ground-based sensors, and modeling outputs, to provide a comprehensive view of the storage site's performance over time.

## 4. Regulatory Compliance

- **Compliance Mapping**: GIS facilitates the mapping and visualization of regulatory requirements and compliance zones.

- **ArcGIS Online**: ArcGIS Online and Living Atlas should be an integral part of your regulatory analysis by syncing your projects with dynamic city and county GIS data such as landowner parcels, electrical infrastructure, and transportation corridors.

## 5. Public Outreach and Communication

- **Stakeholder Engagement**: GIS is valuable for communicating complex information to stakeholders through interactive maps and visualizations, aiding in public outreach and facilitating engagement with communities and decision-makers.

## 6. Decision Support Systems

- **Scenario Analysis**: GIS-based decision support systems enable the evaluation of different scenarios, considering multiple factors such as economic, environmental, and social aspects, to make informed decisions about carbon capture and storage projects.

In summary, GIS and the suite of Esri tools provide a powerful set of tools for spatial analysis and decision-making in carbon capture and storage projects. It helps in the entire lifecycle, from site selection and planning to monitoring and compliance, contributing to the effective and responsible implementation of carbon capture and storage initiatives.

If you are kicking off a CSS project, please don't hesitate to reach out for more information on how GIS can assist.`,
      dashboardLink: null,
      category: 'Carbon Capture',
      tags: ['Carbon Capture', 'CCS', 'Site Selection', 'Pipeline', 'GIS'],
    },
    {
      id: 13,
      title: 'GIS Constraint Guide for Renewable Energy',
      author: 'Andy Bohnhoff',
      date: 'October 15, 2023',
      readTime: '4 min read',
      excerpt: 'Mapping available land for energy development is critical for land use planning. Utilizing Esri ArcGIS, we can accurately assess constraints such as topography, floodplains, tree cover, and distance to power.',
      content: `Mapping available land for energy development is critical for land use planning efforts. An expanding urban sprawl and predicting future development is essential to promote sustainability. Utilizing Esri ArcGIS, we can accurately access constraints such as topography, floodplains, tree cover and distance to power. An accurate GIS system also allows for updated imagery and countywide parcel data.

## Topography

As you would expect, ideal topography for solar development is flat land. Obviously, that is not possible 100% of the time. According to Solar Power World, "Solar sites in the Northeast, mountain states or hilly regions can undergo civil engineering to make level ground for mounting. Yet, grading land can alter rain runoff patterns on the site, possibly displacing native species and raising project costs."

Less than 20% grade is ideal for solar development. States such as Florida and Georgia have ideal topography for solar development. However, the same development can be immensely more difficult in eastern states like North Carolina, Maryland, Virginia, and Kentucky.

The industry standard for accessing topographic maps and data is the USGS (usgs.gov). Elevation data is produced and distributed by a program called "3D Elevation Program" (3DEP). Most of the current topo data is derived from lidar point clouds and meets accuracy and spacing specifications. 1-meter DEMs are available for a majority of the United States and will be expanding through 3DEP.

## Hydrography

The next piece of constraint data is hydrography data. Similar to the topography data, hydrography and watershed boundaries are a natural constraint that must be monitored before development. Once again, the USGS is a valuable source for this data.

The USGS National Geospatial Program manages the National Hydrography Dataset (NHD), Watershed Boundary Dataset (WBD), and NHDPlus High Resolution (NHDPlus HR). These geospatial datasets represent the surface water of the United States for mapping and modeling applications.

The NHDPlus HR program is particularly enticing for solar developers. Their goal is to produce a nation-wide dataset that simulates stream flows which in return provides waterflow estimates, flood predictions, and the evaluation of landscape on aquatic habitats.

## Tree Cover

The percentage of tree cover on a given parcel is important to the existing habitat. Some states do allow for timber harvesting to clear space for solar development, however it is usually a last resort for many developers.

Other than having "boots on the ground," the best visual for determining tree cover is aerial imagery. A popular form of aerial imagery today is drone imagery. However, drone imagery is cost prohibitive for many firms. The next best source is satellite imagery, available through programs like Google Earth or Esri ArcGIS Online.

ArcGIS Online allows you to bring all your GIS constraints into one platform and view basemaps such as imagery, topography and transportation.

## Distance to Power

The final, and most difficult data to obtain, is distance to power sources. The best open source data for nationwide power is the Homeland Infrastructure Foundation Level-Data (HIFLD).

The data in ArcGIS Online that is most commonly used in solar energy projects is titled "Electric Power Transmission Lines" — lines operated at relatively high voltages varying from 69 kV up to 765 kV, capable of transmitting large quantities of electricity over long distances. Underground transmission lines are included where sources are available.

Most AGOL data can also be exported to ArcGIS Pro or to various formats like shapefile or Google Earth KML.`,
      dashboardLink: null,
      category: 'Renewable Energy',
      tags: ['Solar', 'Constraints', 'Topography', 'USGS', 'ArcGIS Online'],
    },
    {
      id: 14,
      title: 'Utilizing Models to Unlock Solar Energy Potential',
      author: 'Andy Bohnhoff',
      date: 'September 15, 2023',
      readTime: '1 min read',
      excerpt: 'In this presentation given at the Q1 Rocky PUG meeting in Denver, we dive into the use of automated models within ArcGIS Pro to identify prime locations for solar development.',
      content: `In this presentation, given at the Q1 Rocky PUG meeting in Denver, we dive into the use of automated models within ArcGIS Pro to identify prime locations for solar development. We demonstrate how these models streamline the site selection process, enabling stakeholders to make informed decisions and maximize the utilization of renewable solar energy resources.

## Key Takeaways

- **Automated Model Building**: Using ModelBuilder in ArcGIS Pro to create repeatable workflows for solar site identification
- **Multi-Factor Analysis**: Combining slope, aspect, land use, and infrastructure proximity data for comprehensive site evaluation
- **Streamlined Decision Making**: Enabling stakeholders to quickly evaluate multiple potential sites with consistent criteria
- **Scalable Approach**: Models can be adapted for different regions and project requirements

This presentation demonstrated how GIS professionals can leverage automation to accelerate the solar site selection process while maintaining rigorous analytical standards.`,
      dashboardLink: null,
      category: 'Solar Energy',
      tags: ['Solar', 'ArcGIS Pro', 'ModelBuilder', 'Presentation'],
    },
    {
      id: 15,
      title: '2021 Esri Petroleum Users Group Presentation',
      author: 'Andy Bohnhoff',
      date: 'April 15, 2021',
      readTime: '2 min read',
      excerpt: 'We presented at the 2021 Esri Petroleum Users Group meeting on "Navigating Colorado\'s Regulatory Environment" — diving into COGCC rule making and its effect on the oil and gas industry.',
      content: `We are happy to announce a presentation at the 2021 Esri Petroleum Users Group meeting May 4-6. The title of the presentation is "Navigating Colorado's Regulatory Environment" and will dive a little deeper into the new COGCC rule making and its effect on the oil and gas industry in Colorado.

## Presentation Overview

The theme of the presentation is how a single GIS analyst can utilize the suite of Esri tools to assist multiple teams within their company in navigating the regulatory environment of Colorado.

The demo includes:

- **Scheduling ModelBuilder** to update Portal layers automatically
- **Enabling editing on hosted layers** to update in real time
- **AGOL app collaboration** allowing multiple teams to work together within a company
- **Rig sound signature data** to help with sound wall placement and noise mitigation

## Why This Matters

Having the sound signatures of rigs is a tool that demonstrates positive health, safety and environmental standards. Staying within compliance on sound is a big part of the new COGCC rule making and is something that every company should be addressing.

Having the needs of Colorado stakeholders in mind will also create positive social and corporate responsibility.`,
      dashboardLink: null,
      category: 'Oil & Gas',
      tags: ['Oil & Gas', 'COGCC', 'Colorado', 'Esri PUG', 'Regulatory'],
    },
    {
      id: 16,
      title: 'Bureau of Labor Updated Statistics',
      author: 'Andy Bohnhoff',
      date: 'May 13, 2020',
      readTime: '2 min read',
      excerpt: 'The Bureau of Labor released updated employment statistics and the news was not great. The jobless rate jumped to over 14.5% — the highest level since the Great Depression. Here\'s how GIS visualizes the impact.',
      content: `Last week the Bureau of Labor released their updated employment statistics...and the news was not great. The jobless rate jumped to over 14.5% — the highest level since the Great Depression in the early 1930's.

The map was created in ArcGIS Online utilizing the Bureau of Labor updated stats. Blue indicates an unemployment level over 7%.

## Colorado

On a local level, Colorado reported 142,578 unemployed people for the month of March. This puts the unemployment rate at 4.5%, which is equal to the national average. Just 2 months ago, Colorado's unemployment rate was at 2.5%.

The map below shows Colorado's unemployment levels at a county level. Dark orange equates to an unemployment rate of over 7% while dark blue indicates an unemployment rate of under 3%.

The Colorado county reporting the lowest unemployment rate is Summit County at 2.7%. The Colorado county reporting the highest unemployment rate is Huerfano County in southern Colorado at 12.1%. This is almost 3 times the national unemployment average.

## How to Access This Data

Esri makes it easy to add this data into an ArcGIS Online map by searching "Esri_Demographics" or "Bureau of Labor". The layer comes complete with custom symbology, labels and expressions. You can add the Bureau of Labor's updated data through Esri's Living Atlas.

## Unemployment Dashboard

Using similar data, Esri also provides a free dashboard displaying applicable charts and graphs. The dashboard features state level unemployment insurance weekly claims data from the US Department of Labor, Employment, and Training.

Colorado has an initial claims index of 112, which denotes a 12% increase in claims from the previous week. On a similar note, Colorado is reporting a claims % employment index of 121. Using this index, while 100 indicates the national average, an index of 121 exhibits 21% higher employment claims than the national mean. The dashboard also displays useful information like total claims and bi-weekly claim differences.

The dashboard can be configured to display data for any U.S. state.

The U.S. economy and unemployment rates continue to look stark as more than 33 million Americans have filed for unemployment as the result of the COVID-19 pandemic.

If you are interested in learning more about how unemployment rates and key demographics can affect your business, contact Platte River Analytics today.`,
      dashboardLink: null,
      category: 'Market Analytics',
      tags: ['Bureau of Labor', 'Unemployment', 'COVID-19', 'ArcGIS Online', 'Demographics'],
    },
  ]

  const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date))

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: sortedPosts.slice(0, 20).map((post, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: post.title,
      url: `${SITE_URL}/blog`,
      datePublished: post.date,
    })),
  }

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>GIS Insights & Resources | Platte River Analytics</title>
        <meta name="description" content="Educational GIS content, ArcGIS tips, and spatial analysis examples from Platte River Analytics. Esri training insights, site selection, and location intelligence." />
        <link rel="canonical" href={SITE_URL + '/blog'} />
        <meta property="og:title" content="GIS Insights & Resources | Platte River Analytics" />
        <meta property="og:url" content={SITE_URL + '/blog'} />
        <meta property="og:description" content="Educational GIS content, ArcGIS tips, and spatial analysis examples from our team." />
        <script type="application/ld+json">{JSON.stringify(blogSchema)}</script>
      </Helmet>
      <Navbar />
      <main>
      {/* Blog Header */}
      <section className="py-16 bg-gradient-to-br from-[#f5f7f9] via-white to-[#f0f2f4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              GIS Insights & Resources
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Educational content, GIS tips, and spatial analysis examples from our team
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section 
        ref={blogRef}
        className="py-20 bg-white relative"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {sortedPosts.map((post, index) => (
              <article
                key={post.id}
                className={`bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 ${isVisible['blog'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="bg-gradient-to-r from-[#203b54] to-[#2a4a6b] p-6 md:p-8">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
                      {post.category}
                    </span>
                    {post.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-2 py-1 bg-white/10 text-white text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                    {post.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm">
                    <div className="flex items-center space-x-2">
                      <i className="fas fa-user-circle"></i>
                      <span className="font-medium">{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <i className="fas fa-calendar"></i>
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <i className="fas fa-clock"></i>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {expandedPost === post.id ? (
                    <div className="space-y-6">
                      <div className="prose prose-lg max-w-none text-gray-700">
                        {post.content.split(/\n\n+/).map((paragraph, pIndex) => {
                          const trimmed = paragraph.trim()
                          if (!trimmed) return null
                          
                          if (trimmed.startsWith('## ')) {
                            return (
                              <h4 key={pIndex} className="text-2xl font-bold text-[#203b54] mt-8 mb-4 border-b-2 border-[#97a3b1] pb-2">
                                {trimmed.replace(/^##\s+/, '')}
                              </h4>
                            )
                          } else if (trimmed.startsWith('```')) {
                            const codeContent = trimmed.replace(/^```\n?/, '').replace(/\n?```$/, '')
                            return (
                              <pre key={pIndex} className="bg-gray-900 text-green-400 rounded-lg p-4 overflow-x-auto text-sm my-6 font-mono">
                                <code>{codeContent}</code>
                              </pre>
                            )
                          } else if (trimmed.startsWith('- ')) {
                            const items = trimmed.split('\n').filter((item) => item.trim().startsWith('- '))
                            return (
                              <ul key={pIndex} className="list-disc list-inside space-y-3 mb-6 ml-4">
                                {items.map((item, itemIndex) => {
                                  const cleanItem = item.replace(/^-\s+/, '').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
                                  return <li key={itemIndex} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: cleanItem }} />
                                })}
                              </ul>
                            )
                          } else {
                            const html = trimmed.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/`([^`]+)`/g, '<code class="bg-gray-100 text-[#203b54] px-1 py-0.5 rounded text-sm font-mono">$1</code>')
                            return <p key={pIndex} className="mb-6 leading-relaxed text-lg" dangerouslySetInnerHTML={{ __html: html }} />
                          }
                        })}
                      </div>

                      {post.dashboardLink && (
                        <div className="mt-8 p-6 bg-gradient-to-br from-[#f5f7f9] to-[#e8ebee] rounded-lg border-2 border-[#97a3b1]">
                          <div className="flex items-center space-x-3 mb-3">
                            <i className="fas fa-map-marked-alt text-2xl text-[#203b54]"></i>
                            <h5 className="text-lg font-bold text-[#203b54]">View Live Dashboard</h5>
                          </div>
                          <p className="text-gray-700 mb-4">See a working version of this dashboard in action:</p>
                          <a
                            href={post.dashboardLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 bg-[#203b54] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1a2f44] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                          >
                            <span>Open Dashboard</span>
                            <i className="fas fa-external-link-alt"></i>
                          </a>
                        </div>
                      )}

                      <button
                        onClick={() => setExpandedPost(null)}
                        className="mt-6 text-[#203b54] font-semibold hover:text-[#1a2f44] flex items-center space-x-2 transition-colors"
                      >
                        <i className="fas fa-chevron-up"></i>
                        <span>Show Less</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setExpandedPost(post.id)}
                      className="text-[#203b54] font-semibold hover:text-[#1a2f44] flex items-center space-x-2 transition-colors group"
                    >
                      <span>Read Full Article</span>
                      <i className="fas fa-arrow-right transform group-hover:translate-x-1 transition-transform"></i>
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  )
}

export default Blog
