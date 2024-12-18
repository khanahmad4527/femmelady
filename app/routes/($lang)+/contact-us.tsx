import { Divider, Stack, Text } from '@mantine/core';
import { Fragment } from 'react/jsx-runtime';

const contactUs = [
  {
    title: 'Contact Us',
    content:
      "<p>We'd love to hear from you! Please reach out to us using the following information or fill out the form below, and we'll get back to you as soon as possible.</p>"
  },
  {
    title: 'Our Office',
    content:
      '<p><strong>Location:</strong> 123 Business Ave, City, Country</p><p><strong>Office Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM</p>'
  },
  {
    title: 'Phone Number',
    content:
      "<p>If you'd like to speak with one of our representatives, please call us at <strong>(123) 456-7890</strong>.</p>"
  },
  {
    title: 'Email Address',
    content:
      "<p>You can email us at <a href='mailto:support@unthaa.com'>support@unthaa.com</a> for inquiries or assistance.</p>"
  },
  {
    title: 'Business Inquiries',
    content:
      "<p>If you have business inquiries, partnership opportunities, or want to collaborate with us, please reach out to <a href='mailto:business@unthaa.com'>business@unthaa.com</a>.</p>"
  },
  {
    title: 'Support',
    content:
      "<p>If you need assistance with a product or service, our support team is here to help. Please email <a href='mailto:support@unthaa.com'>support@unthaa.com</a>.</p>"
  }
];

const ContactUs = () => {
  return (
    <Stack>
      {contactUs.map((c, i) => (
        <Fragment key={i}>
          <Text fw={500}>{c.title}</Text>
          <Text>
            <div
              className="dangerouslySetInnerHTML"
              dangerouslySetInnerHTML={{ __html: c.content }}
            />
          </Text>
          <Divider size="sm" my="md" />
        </Fragment>
      ))}
    </Stack>
  );
};

export default ContactUs;
