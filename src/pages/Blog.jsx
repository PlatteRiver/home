import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const Blog = () => {
  const [expandedPost, setExpandedPost] = useState(null)
  const [isVisible, setIsVisible] = useState({})
  const blogRef = useRef(null)

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('data-section-id')
          if (sectionId) {
            setIsVisible(prev => ({ ...prev, [sectionId]: true }))
          }
        }
      })
    }, observerOptions)

    if (blogRef.current) {
      blogRef.current.setAttribute('data-section-id', 'blog')
      observer.observe(blogRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const blogPosts = [
    {
      id: 2,
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

GIS enables comprehensive analysis of the critical factors that determine solar project success. Here are the primary considerations that spatial analysis addresses:

- **Solar Resource Assessment**: GIS integrates solar irradiance data, sun path analysis, and shading models to identify areas with optimal solar potential. This includes analyzing seasonal variations, cloud cover patterns, and topographic influences on solar exposure.

- **Land Suitability Analysis**: Spatial analysis evaluates land use constraints, zoning regulations, parcel boundaries, and ownership patterns. GIS can quickly identify available parcels, assess their size and shape for optimal panel layout, and flag areas with development restrictions.

- **Environmental Constraints**: Critical habitat maps, wetlands, flood zones, and protected areas are overlaid to identify environmental sensitivities. This helps developers avoid areas that could trigger lengthy permitting processes or require expensive mitigation measures.

- **Infrastructure Proximity**: GIS analyzes distance to transmission lines, substations, and road networks. Proximity to existing infrastructure significantly impacts project economics, as connection costs can make or break a project's financial viability.

- **Topographic Analysis**: Slope, aspect, and elevation data help determine site grading requirements and panel orientation. Steep slopes increase construction costs, while optimal aspect angles maximize energy capture.

- **Market and Demographic Factors**: Population density, energy demand patterns, and market pricing zones influence project economics and help identify areas with the highest value for solar development.

## Real-World Impact on Project Success

The value of GIS in solar site selection becomes clear when examining real project outcomes. We've worked with solar developers who initially identified sites through traditional methods, only to discover through GIS analysis that alternative locations offered significantly better economics or fewer development risks.

In one recent project, a developer was considering a 500-acre site for a utility-scale solar installation. Initial assessments suggested the site was ideal—flat terrain, good solar exposure, and apparent land availability. However, our GIS analysis revealed several critical issues: a significant portion of the site was in a 100-year floodplain, transmission line capacity was limited in the area, and the site was adjacent to a protected wildlife corridor that would require extensive environmental review.

By using GIS to analyze alternative sites within the same region, we identified a nearby location that avoided these constraints while maintaining similar solar potential. The alternative site required less environmental mitigation, had better grid access, and ultimately reduced project development costs by approximately 15%. This type of early-stage optimization is only possible with comprehensive spatial analysis.

## The Power of Multi-Criteria Analysis

One of GIS's greatest strengths is its ability to perform multi-criteria evaluation, weighting different factors according to project priorities. For example, a utility-scale project might prioritize transmission access and land cost, while a community solar project might emphasize proximity to load centers and community acceptance.

GIS models can assign weights to different criteria, creating suitability maps that highlight the most promising areas. This analytical approach ensures that site selection decisions are transparent, defensible, and aligned with project goals. Stakeholders can see exactly why a particular site was chosen, which is valuable for securing financing, permits, and community support.

## Looking Forward: Advanced GIS Applications

As solar development continues to accelerate, GIS technology is evolving to support more sophisticated analysis. Machine learning algorithms can now predict site performance based on historical data, while real-time monitoring systems track operational solar installations to validate and refine site selection models.

At Platte River Analytics, we're integrating advanced spatial analytics with renewable energy forecasting to help developers identify not just viable sites today, but locations that will remain competitive as the energy landscape evolves. This forward-looking approach helps ensure that solar projects deliver value throughout their operational lifetime.

## Conclusion

GIS is not just a helpful tool for solar site selection—it's essential. The complexity of modern solar development demands spatial intelligence that can synthesize multiple data sources, identify constraints early, and optimize site selection for maximum project success. Without GIS, developers are essentially flying blind, making critical decisions based on incomplete information.

The solar energy industry is moving toward increasingly sophisticated site selection processes, and organizations that leverage GIS effectively gain a significant competitive advantage. They can move faster, reduce risk, and optimize project economics in ways that simply aren't possible with traditional methods.

If you're planning a solar development project and want to ensure you're selecting the optimal site, reach out to discuss how our GIS consulting services can support your site selection process. We combine deep spatial analysis expertise with renewable energy industry knowledge to help you make data-driven decisions that maximize your project's potential.`,
      dashboardLink: null,
      category: 'Solar Energy',
      tags: ['Solar', 'Site Selection', 'GIS Analysis', 'Renewable Energy', 'Spatial Analysis']
    },
    {
      id: 1,
      title: 'Automating Land Ownership Change Detection with Python and Esri Dashboards',
      author: 'Andy Bohnhoff',
      date: 'April 7, 2024',
      readTime: '3 min read',
      excerpt: 'In the energy and real estate worlds, monitoring land ownership changes is essential. Without effective tracking, organizations risk losing critical insights that can influence major decisions.',
      content: `In the energy and real estate worlds, monitoring land ownership changes is essential. Without effective tracking, organizations risk losing critical insights that can influence major decisions. Recently at Platte River Analytics, we were presented with a problem by a real estate client where land ownership within their AOI was changing hands often and quickly.

So we set out to develop a Python script and Esri dashboard that automates the identification of changes in county parcel data, which in turn enhanced their data analysis capabilities. In this article, we'll share our journey and the benefits the tools bring to GIS projects.

## Understanding the Challenge

Tracking changes in land ownership is complicated and time-consuming. Traditional methods, which often involve manual comparisons of datasets, can lead to errors. For instance, imagine analyzing 20 parcels involved in transactions linked to a new wind farm project. If any changes go unnoticed, the consequence can be considerable, resulting in missed opportunities or misguided investments.

County parcel data is constantly evolving—landowners sell, split, and acquire parcels regularly. But for analysts, tracking these changes manually across hundreds or thousands of records is time-consuming and prone to error. Even subtle changes like a new mailing address or a slight shift in acreage can indicate important updates, such as ownership transfers or parcel splits. Without automation, teams spend hours comparing records line by line, or worse, they miss key changes altogether.

The challenge we faced was creating a reliable system that not only detects these changes swiftly but also presents the information clearly and understandably. Our goal was to improve this situation.

## Innovative Solution

To solve this, we built a custom Python script that automatically detects changes in parcel data. The script can be run daily, weekly, or monthly and flags parcels with differences in:

- **Landowner names**: Recognizing when a parcel changes hands.
- **Mailing address updates**: Ensuring correct communication with the current owners.
- **Parcel size alterations**: Noting any splits or expansions in ownership.

If any changes are detected regarding parcel size, such as a split resulting in multiple new plots, the script flags these alterations immediately.

Users have the flexibility to run the script as needed, whether that's daily, weekly, or monthly. This means GIS analysts can stay informed about changes without being overwhelmed by data, resulting in a more streamlined workflow.

## Interactive Esri Dashboard

Once changes are detected, they're visualized in an interactive dashboard we built for our clients. The dashboard includes:

- A top-left indicator showing how many parcels have changed in the selected time period
- A detailed change list showing each updated parcel with key attributes
- A map view with changed parcels highlighted for fast visual analysis
- An attribute table beneath the map for filtering and sorting

This makes it incredibly easy to scan for changes and drill into the details—no more spreadsheet flipping or manual comparisons.

## Real-World Applications in Energy Projects

While this tool is useful for general land monitoring, it's especially powerful in the energy sector. Here are some specific examples:

- **Oil & Gas**: Use it with a layer of mineral units to track newly assigned operators or with a permits layer to visualize new permits taken in specific areas.
- **Solar Development**: Detect when new parcels have changed hands, indicating a possible new project site.
- **Wind Energy**: Monitor parcels or new wind turbines near your developments for early indicators of new activity.

In each of these scenarios, the script acts as a vital tool for organizations to make informed decisions, ensuring they respond effectively to changing landscapes and market conditions.

## Looking Forward

Our work doesn't end with this script. One of our upcoming goals is to integrate the script with Microsoft Power Automate. This upgrade will facilitate automated email notifications for stakeholders, delivering real-time updates on parcel changes without requiring additional manual work.

Ultimately, our aim is to simplify the process of tracking changes in parcel data. With automation, GIS analysts can focus on interpreting insights rather than spending time wading through data. Currently, projects can take weeks to summarize parcel changes; our solution aims to shorten that time to days or even hours.

## Wrapping Up

We're currently working on integrating this script with Microsoft Power Automate. The goal is to send automated alerts via email when parcel changes are detected—right to your team's inbox. That means no need to even open the dashboard unless something's changed.

Ultimately, this project reflects our broader mission at Platte River Analytics: to automate data workflows and surface insights before you even know you need them.

If you're interested in learning how this tool can be adapted to your data or workflow, reach out. We'd love to show you a demo and talk use cases.`,
      dashboardLink: 'https://platte-river.maps.arcgis.com/apps/dashboards/2fe350aaef24434c9a78bc998a355269',
      category: 'Automation & Workflow',
      tags: ['Python', 'Esri', 'Dashboard', 'Land Records', 'Automation']
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center" style={{ minHeight: '5.625rem', padding: '0.5rem 0' }}>
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <img 
                  src="/platte_river_analytics_logo.jpg" 
                  alt="Platte River Analytics Logo" 
                  className="w-auto transition-transform hover:scale-105 duration-300"
                  style={{ height: '5.625rem' }}
                />
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link to="/#services" className="text-gray-700 hover:text-[#203b54] px-3 py-2 text-sm font-medium transition-all duration-300 relative group">
                  Services
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#203b54] transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link to="/#industries" className="text-gray-700 hover:text-[#203b54] px-3 py-2 text-sm font-medium transition-all duration-300 relative group">
                  Industries
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#203b54] transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link to="/#expertise" className="text-gray-700 hover:text-[#203b54] px-3 py-2 text-sm font-medium transition-all duration-300 relative group">
                  Expertise
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#203b54] transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link to="/#awards" className="text-gray-700 hover:text-[#203b54] px-3 py-2 text-sm font-medium transition-all duration-300 relative group">
                  Awards
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#203b54] transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link to="/blog" className="text-[#203b54] px-3 py-2 text-sm font-medium transition-all duration-300 relative group border-b-2 border-[#203b54]">
                  Insights
                </Link>
                <Link to="/#contact" className="bg-[#203b54] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#1a2f44] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

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
            {blogPosts.map((post, index) => (
              <article
                key={post.id}
                className={`bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 ${isVisible['blog'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Blog Post Header */}
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

                {/* Blog Post Content */}
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
                          } else if (trimmed.startsWith('- ')) {
                            const items = trimmed.split('\n').filter(item => item.trim().startsWith('- '))
                            return (
                              <ul key={pIndex} className="list-disc list-inside space-y-3 mb-6 ml-4">
                                {items.map((item, itemIndex) => {
                                  const cleanItem = item.replace(/^-\s+/, '').replace(/\*\*([^*]+)\*\*:/g, '<strong>$1:</strong>')
                                  return (
                                    <li key={itemIndex} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: cleanItem }} />
                                  )
                                })}
                              </ul>
                            )
                          } else {
                            return (
                              <p key={pIndex} className="mb-6 leading-relaxed text-lg">
                                {trimmed}
                              </p>
                            )
                          }
                        })}
                      </div>

                      {/* Dashboard Link */}
                      {post.dashboardLink && (
                        <div className="mt-8 p-6 bg-gradient-to-br from-[#f5f7f9] to-[#e8ebee] rounded-lg border-2 border-[#97a3b1]">
                          <div className="flex items-center space-x-3 mb-3">
                            <i className="fas fa-map-marked-alt text-2xl text-[#203b54]"></i>
                            <h5 className="text-lg font-bold text-[#203b54]">View Live Dashboard</h5>
                          </div>
                          <p className="text-gray-700 mb-4">
                            See a working version of this dashboard in action:
                          </p>
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

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <img 
                src="/platte_river_analytics_logo.jpg" 
                alt="Platte River Analytics Logo" 
                className="h-8 w-auto mb-4 brightness-0 invert"
              />
              <p className="text-gray-400 text-sm">
                Location intelligence and GIS consulting for better business decisions.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/#services" className="hover:text-white transition-colors">GIS Consulting</Link></li>
                <li><Link to="/#services" className="hover:text-white transition-colors">Interactive Mapping</Link></li>
                <li><Link to="/#services" className="hover:text-white transition-colors">Data Collection</Link></li>
                <li><Link to="/#services" className="hover:text-white transition-colors">Site Selection</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Industries</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/#industries" className="hover:text-white transition-colors">Broadband</Link></li>
                <li><Link to="/#industries" className="hover:text-white transition-colors">Energy</Link></li>
                <li><Link to="/#industries" className="hover:text-white transition-colors">Real Estate</Link></li>
                <li><Link to="/#industries" className="hover:text-white transition-colors">Economic Development</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="/#contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} Platte River Analytics. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Blog

