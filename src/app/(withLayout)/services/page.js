"use client";

import { useState, useEffect, useRef } from "react";
import { register } from "swiper/element/bundle";
import DetailsSection from "@/components/shared/DetailsSection";

register();

export default function Servcies() {
  const [activeOptionIndex, setActiveOptionIndex] = useState(0);
  const swiperElRef = useRef(null);
  const services = [
    {
      heading: "Define",
      description: "Understanding your goals and path to success.",
      options: [
        {
          heading: "Digital Strategy",
          imageURL:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          details: `
          <p><span class="ql-size-large">Sustainable results in the digital world don't come from quick wins. With Youwes Digital Strategy Consultancy, we focus on long-term impact. We make the right choices so you get the most out of digital opportunities.</span></p>
          <p><br></p>
          <p>The daily reality of digital challenges and departmental silos is sometimes difficult to reconcile with future ambitions. When effective strategies are overlooked, the path to success becomes even more complex. This is where Youwe's Digital Strategy service come into play. Let us help you to unlock your organization's potential and achieve quantifiable results.</p>
          <p><br></p>
          <p>Our tried-and-tested methods like BHAG and OGSM drive accountable actions and measurable outcomes. At Youwe, we go beyond strategy, delivering solutions that create real value. Thanks to our unique RESI approach, we have a clear understanding of the six key areas that require attention for long-term success. We collaborate closely with your team, ensuring everyone grasps the purpose and value of our actions. By orchestrating all efforts of your organization, Youwe's professionals, together with your partners, ensure sustainable results.</p>
        `,
        },
        {
          heading: "Platform Consulting",
          imageURL:
            "https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          details: `
          <p><span class="ql-size-large">Future-proof your digital landscape with our platform consulting services. We create robust strategies, simplify processes, and reduce costs, merging modern tech with your existing legacy systems.</span></p>
          <p><br></p>
          <p>Businesses need to accelerate digitally to keep up with competition and fulfill customer needs. Slow efforts can result in high platform costs, sluggish growth, scalability issues, customer loss, and IT challenges in integrating new technologies.</p>
          <p><br></p>
          <p>At Youwe, we're here for you. We optimize your digital environment, modernize where necessary. With over 23 years of experience, we craft a thoughtful plan to propel your systems into the future. We reduce complexity without compromising quality or performance. Our approach is designed to foster continuous advancement across all fronts – from empowering individuals, refining processes, to harnessing cutting-edge technology.</p>
        `,
        },
        {
          heading: "AI Consulting",
          imageURL:
            "https://images.unsplash.com/photo-1677756119517-756a188d2d94?q=80&w=2050&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          details: `
          <p><span class="ql-size-large">Looking for ways to add value with AI to your business? Our seasoned AI experts assess your company's readiness for AI integration and propose actionable AI projects, tailored to bring immediate value. From automating processes to improved decision-making or personalizing customer experiences. Learn how we can help you adopt AI the right way.</span></p>
          <p>Our focus is on transforming key areas within your organization, particularly those that impact your most vital operations. By implementing modern AI models, we significantly reduce costly manual labour while enhancing both accuracy and effectiveness.</p>
          <p><br></p>
          <p>Our expertise in AI consulting is deep-rooted and wide-ranging, encompassing the latest advancements in large language models and machine learning. With a seasoned team dedicated to leveraging these technologies, Youwe ensures your enterprise not only keeps pace with industry innovations but also achieves substantial operational efficiencies and a competitive edge in the market.</p>
        `,
        },
      ],
    },
    {
      heading: "Experience",
      description:
        "Bring your brand to life and create memorable digital experiences at scale.",
      options: [
        {
          heading: "Customer Centric Design",
          imageURL:
            "https://images.unsplash.com/photo-1549923746-c502d488b3ea?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          details: `
          <p><span class="ql-size-large">Our creative studio focuses on crafting experiences that resonate with your target audience. Through customer research and data, we create engaging experiences that enhance conversion and customer loyalty. We understand what customers want at every stage, designing seamless digital experiences for all touchpoints.</span></p>
          <p><br></p>
          <p>Digital platforms are crucial for customers. Traditional designs often fall short, resulting in reduced engagement and conversions. Opt for Customer Centric Design to maintain market relevance and customer loyalty, while enhancing digital experiences.</p>
          <p><br></p>
          <p>Customer-centric design is essential for resonating with your audience. Our service prioritizes your customers, seamlessly aligning with their needs. Through in-depth research and customer interviews, we identify pain points and unmet needs. We create experiences that boost engagement and conversions. Our team employs advanced techniques for continuous optimization. This propels you ahead, enhances brand loyalty, and propels growth to new heights.</p>
        `,
        },
        {
          heading: "Brand Driven Design",
          imageURL:
            "https://images.unsplash.com/photo-1597587606035-b64422b50f82?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          details: `
          <p><span class="ql-size-large">Crafting a unique brand identity through digital design is what we define as brand-driven design. By harnessing data and deep insights, we carve out a digital presence that sets you apart from the competition. Our approach ensures your brand resonates powerfully, making every digital interaction a step ahead of your competitors.</span></p>
          <p><br></p>
          <p>In the digital era, brands face the challenge of being unique while consistently staying in the spotlight. With intense competition, brands risk inadvertently fading into the background and missing their target audience.</p>
          <p><br></p>
          <p>Our brand strategists go beyond designing; we forge a digital identity that is unmistakably yours. Using data and profound insights, we analyze both competition and international challenges. This way, your brand stands out, reaches your audience, and navigates the intricate world of digital communication.</p>
        `,
        },
        {
          heading: "Creative Development",
          imageURL:
            "https://images.unsplash.com/photo-1501084817091-a4f3d1d19e07?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          details: `
          <p><span class="ql-size-large">Blending creativity with business insight, Youwe's front-end solutions shape touchpoints that reflect your brand and optimize conversions.</span></p>
          <p><br></p>
          <p>Building a consistent digital experience is quite challenging. You want to grow and still maintain your brand's recognition everywhere. This becomes even more challenging as technology and user expectations change.</p>
          <p><br></p>
          <p>At Youwe, we understand this. That's why we employ composable design and headless solutions. We thoroughly test everything to ensure smooth functionality across all devices. With our tools, like front-end development and modern JavaScript frameworks, we lay a solid foundation. This way, we ensure a recognizable brand presence wherever your audience is, helping you build trust and loyalty with your customers.</p>
        `,
        },
      ],
    },
    {
      heading: "Deploy",
      description:
        "Setup and maintenance of digital solutions. Combining your digital objectives with our digital engineering expertise to let your business grow.",
      options: [
        {
          heading: "Ecommerce",
          imageURL:
            "https://images.unsplash.com/photo-1586880244543-0528a802be97?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          details: `
          <p><span class="ql-size-large">Are you in search of a dependable eCommerce partner? Youwe provides tailored services to boost your online sales and operations. We prioritize delivering measurable outcomes via strong platforms and user-oriented experiences.</span></p>
          <p><br></p>
          <p>Experience the benefits of a flexible e-commerce landscape with fast time-to-market and a balanced blend of short-term impact and long-term revenue. As a technology-agnostic agency, we work with proven commerce platforms, from easy-start solutions to building a fully composable commerce business.</p>
          <p><br></p>
          <p>We are determined to do what's right for your business: we focus on delivering results while ensuring a future-proof foundation. Our people are valued for their strategic approach and hands-on mentality. Whether you need assistance in selecting the right platform, developing a conversion-focused strategy or ensuring optimal SEO performance, your team will be tailored to your needs, aligned with the stage of your digital journey.</p>
        `,
        },
        {
          heading: "PIM / Master Data Management",
          imageURL:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          details: `
          <p><span class="ql-size-large">Get a firm grip on your master data and product information management (PIM). Our focus is on making data architecture simple and practical. Designed to help your business become digitally mature.</span></p>
          <p><br></p>
          <p>A PIM or MDM system prevents data inconsistencies and improves decision-making through reliable information. A must-have for commercial organizations, it ensures efficient operations and leads to satisfied customers. Meet their expectations, as well as those of partners, with seamless integration of master data.</p>
          <p><br></p>
          <p>At Youwe, we simplify your data management with our PIM and MDM solutions. We optimize your data, aligning it with industry standards such as GS1, ETIM, or eClass when necessary. We foster collaboration between departments and platforms, saving you valuable time. Whether you're distributing product information or improving your product lifecycle, we ensure high-quality data to help you achieve your goals quickly and efficiently.</p>
        `,
        },
        {
          heading: "AI driven Expert systems",
          imageURL:
            "https://images.unsplash.com/photo-1616161560417-66d4db5892ec?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          details: `
          <p><span class="ql-size-large">Get answers about your products and services faster and more accurately. We introduce AI-driven expert systems that are trained on your products and services data. Simplify complex information for end-users, facilitating better understanding and quicker decision-making, leading to improved performance at lower costs.</span></p>
          <p><br></p>
          <p>Many industries struggle with answering questions about products and services both internally and externally. The increased complexity of modern-day product offerings and regulations is leading to more advanced questions. Dealing with this growing workload can be challenging for many businesses, especially in markets where qualified staff is difficult to find and as baby boomers retire. Our expert systems can help you unlock your company's knowledge for your stakeholders in a safe and efficient manner.</p>
          <p><br></p>
          <p>We train AI models using all of your company’s (and suppliers’) documentation, creating virtual assistants that are well-versed in your business-specific information. Through advanced data labeling and Master Data Management (MDM) solutions, we efficiently store your unstructured data, enabling AI models to quickly find the right answers. Recognizing the importance of specificity and accuracy in customer interactions, we train our models to deliver precise responses at the required level of detail.</p>
        `,
        },
        {
          heading: "Digital Experience Platforms (CMS)",
          imageURL:
            "https://images.unsplash.com/photo-1560472355-a3b4bcfe790c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          details: `
          <p><span class="ql-size-large">DXPs are essential for modern businesses. They provide seamless, personalized experiences across various touchpoints, including content management, analytics, and marketing automation. Create a holistic and dynamic digital journey for your customers with DXPs and stay ahead in the digital world.</span></p>
          <p><br></p>
          <p>Providing personalized cross-channel customer experiences is challenging for businesses, especially due to the need for reliable data to base decisions on. This process can become complex and time-consuming due to non-integrated systems and isolated data storage.</p>
          <p><br></p>
          <p>DXPs (Digital Experience Platforms) create seamless customer experiences by integrating various technologies, such as content management, marketing automation, e-commerce, and CRM, into one platform. With a DXP, you can manage and personalize customer experiences across all touchpoints and gain valuable insights for data-driven decisions. Improved customer satisfaction and business performance are the results.</p>
        `,
        },
      ],
    },
    {
      heading: "Attract",
      description:
        "Grow your digital platform and attract the right audience to your platform and turn them into loyal customers.",
      options: [
        {
          heading: "Search Engine Marketing",
          imageURL:
            "https://images.unsplash.com/photo-1477013743164-ffc3a5e556da?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          details: `
          <p><span class="ql-size-large">Boost your organic traffic and conversions with our data-driven SEM services. With your unique data as our starting point, we build a strong online visibility that results in sustainable traffic growth.</span></p>
          <p><br></p>
          <p>Without effective search engine optimization and search advertising, your website can get lost in the vast amount of online content and struggle to reach its audience. Poor SEO and SEA result in less traffic, conversions and ultimately less revenue.</p>
          <p><br></p>
          <p>Our SEO services provide a direct solution to your search engine challenges. We utilize data-driven strategies to enhance your visibility, generate organic traffic, and improve conversions. Your website will rise in Google search results, effectively reaching your target audience. Together, we can turn your SEO weaknesses into strengths, making your business more competitive and future-ready in the ever-evolving digital market.</p>
        `,
        },
        {
          heading: "Conversion Rate Optimisation (CRO)",
          imageURL:
            "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=1902&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          details: `
          <p><span class="ql-size-large">Optimize your digital results with conversion optimization. Our data-driven CRO experts ensure continuous improvements, leading to consistent growth in your results. No random adjustments, but based on thorough data analysis. This is how you achieve measurable success.</span></p>
          <p><br></p>
          <p>Are you investing a lot of time, money, and energy in driving traffic to your online store without seeing additional sales as a result? Or have you created amazing user experiences but don't see this reflected in conversions? We have the solution. With a data-driven approach, we improve your online results.</p>
          <p><br></p>
          <p>Effectively implement CRO with our approach: analyze user behavior, identify obstacles, and design A/B tests based on solid hypotheses. Track progress in a real-time dashboard, where the winning test becomes the starting point for further optimization. We train your team to make better and informed decisions. With CRO as our guide, we enhance your online ROI.</p>
        `,
        },
        {
          heading: "Performance Marketing Campaigns",
          imageURL:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          details: `
          <p><span class="ql-size-large">No fluff, just performance with our result-driven marketing services. Partner with us and attract the right audience and convert them into loyal customers. Every action, every creative, and every campaign is optimized for results.</span></p>
          <p><br></p>
          <p>Performance marketing on platforms like Google, Facebook, Bing, and LinkedIn is challenging due to rising costs and fluctuating results, despite promising AI technologies. A familiar challenge for many.</p>
          <p><br></p>
          <p>Youwe combines marketing expertise and engineering skills. We focus solely on what truly works and enhance your campaigns across all platforms for maximum returns. Whether you're advertising on Google, Amazon, or multiple channels simultaneously, our approach revolves around clear strategies and tangible outcomes.</p>
        `,
        },
        {
          heading: "Marketplaces",
          imageURL:
            "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          details: `
          <p><span class="ql-size-large">Master e-commerce with Product Feed Marketing. Efficiently distribute and fine-tune product data and exchange order information on marketplaces like Amazon, eBay, and Zalando to maximize conversions.</span></p>
          <p><br></p>
          <p>Marketplaces like Amazon, eBay and Zalando offer growth opportunities, but also present challenges. Each marketplace has unique rules and regulations, making the integration and management of product data time-consuming. Additionally, overseeing orders, inventory and customer service adds extra complexity.</p>
          <p><br></p>
          <p>Our marketplace integration service simplifies the sales process. With advanced integration software and mapping templates, we swiftly and accurately synchronize product data across multiple marketplaces. Automating the sales process reduces manual tasks, enabling easy inventory management, order processing, and consistent customer service. This allows businesses to focus on sustainable, cross-border growth.</p>
        `,
        },
      ],
    },
    {
      heading: "Measure",
      description:
        "Optimize your digital presence by analysing data and providing actionable insights",
      options: [
        {
          heading: "Conversion Rate Optimisation",
          imageURL:
            "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          details: `
          <p><span class="ql-size-large">Optimize your digital results with conversion optimization. Our data-driven CRO experts ensure continuous improvements, leading to consistent growth in your results. No random adjustments, but based on thorough data analysis. This is how you achieve measurable success.</span></p>
          <p><br></p>
          <p>Are you investing a lot of time, money, and energy in driving traffic to your online store without seeing additional sales as a result? Or have you created amazing user experiences but don't see this reflected in conversions? We have the solution. With a data-driven approach, we improve your online results.</p>
          <p><br></p>
          <p>Effectively implement CRO with our approach: analyze user behavior, identify obstacles, and design A/B tests based on solid hypotheses. Track progress in a real-time dashboard, where the winning test becomes the starting point for further optimization. We train your team to make better and informed decisions. With CRO as our guide, we enhance your online ROI.</p>
        `,
        },
      ],
    },
  ];

  useEffect(() => {
    // When user changes the slide
    swiperElRef.current.addEventListener("swiperslidechange", (event) => {
      const [swiper] = event.detail;

      setActiveOptionIndex(0); // Set the first option as the active one

      // Disable release on edges feature to avoid undesired scrolling outside the slides section
      setTimeout(() => {
        swiper.params.mousewheel.releaseOnEdges = false;
      }, 400);
    });

    // When user reaches the last slide
    swiperElRef.current.addEventListener("swiperreachend", (event) => {
      const [swiper] = event.detail;

      // Enable release on edges feature to allow users to scroll beyond the slides section
      setTimeout(() => {
        swiper.params.mousewheel.releaseOnEdges = true;
      }, 500);
    });
  }, []);

  return (
    <main>
      {/* Slide container */}
      <swiper-container
        ref={swiperElRef}
        slides-per-view="1"
        grab-cursor="true"
        speed="700"
        effect="fade"
        pagination="true"
        pagination-clickable="true"
        mousewheel="true"
        mousewheel-release-on-edges="true"
        touch-release-on-edges="true"
        id="services"
      >
        {/* For each service, create a slide */}
        {services.map((service, serviceIndex) => {
          return (
            // Slide
            <swiper-slide key={serviceIndex}>
              <div
                className="relative flex h-full justify-center bg-cover pb-20 pt-36 text-[#f7f7f7]"
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${service.options[activeOptionIndex]?.imageURL})`,
                }}
              >
                {/* Page heading */}
                <h1 className="fixed -left-4 bottom-12 w-20 text-[160px]/[135px] font-bold text-[#F7F7F7]/20">
                  Our <br /> Services
                </h1>
                {/* Slide contents */}
                <div className="z-[1] max-w-full gap-x-32 space-y-24 px-5 sm:px-8 lg:px-12 xl:mx-auto xl:flex xl:max-w-[1200px] xl:space-y-0 xl:px-0">
                  <section className="h-fit space-y-11 sm:mr-32 md:mr-52 lg:mr-0 lg:w-2/3 xl:sticky xl:top-40 xl:w-[420px]">
                    <div className="space-y-2">
                      {/* Slide heading */}
                      <h2 className="mt-3 text-2xl font-medium max-xl:line-clamp-2 sm:text-3xl">
                        {service.heading}
                      </h2>
                      {/* Slide description */}
                      <p className="mt-1.5 text-lg text-neutral-300 max-xl:line-clamp-3">
                        {service.description}
                      </p>
                    </div>
                    {/* Slide options */}
                    <div className="space-y-4">
                      {service.options.map((option, optionIndex) => {
                        return (
                          <div
                            className={`flex h-16 max-w-96 cursor-pointer items-center rounded-xl border border-neutral-500 bg-cover bg-center px-5 transition-[filter] duration-500 ease-in-out ${optionIndex === activeOptionIndex ? "brightness-100" : "brightness-[0.6] hover:brightness-100"}`}
                            style={{
                              backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url(${option.imageURL})`,
                            }}
                            onClick={() => {
                              setActiveOptionIndex(optionIndex);
                            }}
                            key={optionIndex}
                          >
                            <h4 className="text-xl font-bold">
                              {option.heading}
                            </h4>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                  {/* Service details section */}
                  <DetailsSection
                    itemDetails={[
                      {
                        heading: service.options[activeOptionIndex]?.heading,
                        description:
                          service.options[activeOptionIndex]?.details,
                      },
                    ]}
                  />
                </div>
              </div>
            </swiper-slide>
          );
        })}
      </swiper-container>
    </main>
  );
}
