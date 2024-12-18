import { Divider, Stack, Text } from '@mantine/core';
import { Fragment } from 'react/jsx-runtime';

const aboutUs = [
  {
    title: 'About Us',
    content:
      '<p>Welcome to our company! We are dedicated to providing exceptional services and products that make a positive impact on our customers and community.</p>'
  },
  {
    title: 'Our Mission',
    content:
      '<p>Our mission is to deliver innovative solutions that meet the evolving needs of our clients. We strive to exceed expectations through our dedication to quality and customer satisfaction.</p>'
  },
  {
    title: 'Our Vision',
    content:
      '<p>We envision a future where our services contribute to a better, more sustainable world. We aim to be a leader in our industry, known for our integrity, excellence, and commitment to progress.</p>'
  },
  {
    title: 'Our Values',
    content:
      '<ul><li><strong>Integrity:</strong> We act with honesty and transparency in everything we do.</li><li><strong>Innovation:</strong> We embrace creativity and technology to drive growth.</li><li><strong>Customer Focus:</strong> We prioritize the needs of our clients and deliver outstanding experiences.</li><li><strong>Sustainability:</strong> We are committed to practices that promote environmental and social responsibility.</li></ul>'
  },
  {
    title: 'Our Team',
    content:
      '<p>Our team is composed of passionate and skilled professionals who are dedicated to achieving our mission. Together, we work towards creating a positive impact for our clients, partners, and communities.</p>'
  },
  {
    title: 'Our History',
    content:
      "<p>Founded in 2024, our company has grown from a small startup into a recognized leader in our industry. Over the years, we've expanded our offerings and built strong relationships with clients worldwide.</p>"
  },
  {
    title: 'Why Choose Us',
    content:
      "<p>We are committed to delivering exceptional quality and customer service. Our expertise, combined with our focus on innovation, makes us the ideal partner for your needs. Whether you're looking for tailored solutions or cutting-edge products, we are here to help.</p>"
  },
  {
    title: 'Contact Us',
    content:
      "<p>Have questions or need more information? Reach out to us through our <a href='/contact'>Contact page</a>, and we'd be happy to assist you!</p>"
  }
];

const AboutUs = () => {
  return (
    <Stack>
      {aboutUs.map((pp, i) => (
        <Fragment key={i}>
          <Text fw={500}>{pp.title}</Text>
          <Text>
            <div
              className="dangerouslySetInnerHTML"
              dangerouslySetInnerHTML={{ __html: pp.content }}
            />
          </Text>
          <Divider size="sm" my="md" />
        </Fragment>
      ))}
    </Stack>
  );
};

export default AboutUs;
