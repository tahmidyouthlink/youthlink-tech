import CardsAndDetailsLayout from "@/components/shared/CardsAndDetailsLayout";
import DetailsSection from "@/components/shared/DetailsSection";

export default function industryDetails({ params }) {
  const industries = [
    {
      _id: "1a2b3c4d",
      heading: "Fashion & Lifestyle",
      description:
        "Future proof e-commerce infrastructures combined with stunning experiences",
      imageURL:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      details: `
        <p><span class="ql-size-large">Fashion & Lifestyle:</span></p>
        <p>Schneider Electric is a global market leader in energy management and automation with operations in more than 150 countries. Schneider Electric sold mostly on the B2B market and via resellers. "To better understand and support customers in the buying process, we need to know exactly what drives the end customer," said Robert Jan van Nouhuys, digital commerce manager.</p>
        <p><br></p>
        <p>Schneider Electric is primarily a B2B company, focusing on indirect sales channels. However, they have embarked on a digital transformation to enhance their B2C presence, leveraging platforms like Magento Commerce to optimize their online shopping experience.</p>
      `,
    },
    {
      _id: "2b3c4d5e",
      heading: "Financial Services",
      description:
        "Financial growth with secure digital transformations at scale",
      imageURL:
        "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      details: `
        <p><span class="ql-size-large">Financial Services:</span></p>
        <p>Our client in the financial services sector aims for robust growth through secure digital transformations at scale. They prioritize integrating cutting-edge technologies to streamline operations and enhance customer experiences.</p>
        <p><br></p>
        <p>With a focus on digital innovation, they seek to expand their market presence and strengthen their competitive edge by leveraging advanced analytics and AI-driven insights.</p>
      `,
    },
    {
      _id: "3c4d5e6f",
      heading: "Food & Agriculture",
      description:
        "Optimizing Food & Agribusiness operations through digital engineering",
      imageURL:
        "https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      details: `
        <p><span class="ql-size-large">Food & Agriculture:</span></p>
        <p>We partnered with a leading firm in food & agriculture to optimize their operations through digital engineering. Their goal is to enhance efficiency across supply chain management and agricultural production.</p>
        <p><br></p>
        <p>By adopting advanced digital solutions, they aim to achieve sustainable growth and improve product quality while meeting the demands of a rapidly evolving market.</p>
      `,
    },
    {
      _id: "4d5e6f7g",
      heading: "Healthcare & Pharmaceuticals",
      description: "Digital platforms for enhanced patient care and compliance",
      imageURL:
        "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=1880&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      details: `
        <p><span class="ql-size-large">Healthcare & Pharmaceuticals:</span></p>
        <p>Our client in healthcare & pharmaceuticals focuses on enhancing patient care and compliance through innovative digital platforms. They are committed to leveraging technology to improve healthcare outcomes and patient engagement.</p>
        <p><br></p>
        <p>By integrating digital solutions, they aim to streamline processes, reduce healthcare costs, and ensure regulatory compliance, ultimately enhancing the quality of care delivered to patients.</p>
      `,
    },
    {
      _id: "5e6f7g8h",
      heading: "Industrial Supplies & Components",
      description:
        "Digitally engineered solutions for supply chain and go to market excellence",
      imageURL:
        "https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      details: `
        <p><span class="ql-size-large">Industrial Supplies & Components:</span></p>
        <p>Our client specializes in providing digitally engineered solutions for supply chain optimization and achieving go-to-market excellence. They focus on enhancing efficiency, reducing costs, and improving customer satisfaction through innovative technologies.</p>
        <p><br></p>
        <p>By leveraging digital platforms and advanced analytics, they aim to meet the evolving needs of their customers and maintain a competitive edge in the industrial supplies and components sector.</p>
      `,
    },
    {
      _id: "6f7g8h9i",
      heading: "Public Sector",
      description: "Digitally transforming public services for better outcomes",
      imageURL:
        "https://images.unsplash.com/photo-1571143114246-9d5b0788e8c7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      details: `
        <p><span class="ql-size-large">Public Sector:</span></p>
        <p>We collaborate with public sector organizations to drive digital transformation and deliver better outcomes for citizens. Our solutions focus on enhancing service delivery, improving efficiency, and fostering transparency through technology.</p>
        <p><br></p>
        <p>By implementing digital platforms and citizen-centric innovations, we aim to empower governments to respond effectively to societal challenges and deliver public services that meet the expectations of citizens.</p>
      `,
    },
    {
      _id: "7g8h9i0j",
      heading: "Retail & E-Commerce",
      description:
        "Innovative digital solutions for retail and e-commerce success",
      imageURL:
        "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      details: `
        <p><span class="ql-size-large">Retail & E-Commerce:</span></p>
        <p>We partner with retail and e-commerce companies to develop innovative digital solutions that drive success in a competitive market. Our focus is on enhancing customer experiences, optimizing operations, and enabling growth through digital transformation.</p>
        <p><br></p>
        <p>By leveraging cutting-edge technologies and data-driven insights, we empower our clients to stay ahead of market trends, attract more customers, and achieve sustainable business growth in the digital age.</p>
      `,
    },
    {
      _id: "8h9i0j1k",
      heading: "Technology & Media",
      description:
        "Cutting-edge solutions for the technology and media industries",
      imageURL:
        "https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      details: `
        <p><span class="ql-size-large">Technology & Media:</span></p>
        <p>We specialize in delivering cutting-edge solutions tailored for the technology and media industries. Our expertise spans from digital transformation strategies to innovative product development and market expansion.</p>
        <p><br></p>
        <p>By harnessing emerging technologies and creative approaches, we help our clients navigate digital disruption, enhance audience engagement, and capitalize on new opportunities in the rapidly evolving technology and media landscape.</p>
      `,
    },
  ];
  const industryDetails = industries?.find(
    (industry) => industry._id === params.id,
  );

  return (
    <CardsAndDetailsLayout itemToDisplay={industryDetails} pageType="details">
      {/* Work details section */}
      <DetailsSection
        itemDetails={[
          {
            heading: "How We Contribute",
            description: industryDetails.details,
          },
        ]}
      />
    </CardsAndDetailsLayout>
  );
}
