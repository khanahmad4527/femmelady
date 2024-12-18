import { Divider, Stack, Text } from '@mantine/core';
import { Fragment } from 'react/jsx-runtime';

const privacyPolicies = [
  {
    title: 'Privacy Policy',
    content:
      '<p>Your privacy is important to us. This privacy policy explains the types of personal information we collect and how we use it.</p>'
  },
  {
    title: 'Data Collection',
    content:
      '<p>We collect personal information such as your name, email address, and payment details when you make a purchase or sign up for our services.</p>'
  },
  {
    title: 'Use of Data',
    content:
      '<p>We use your data to process orders, improve our services, and communicate with you about promotions and updates.</p>'
  },
  {
    title: 'Data Protection',
    content:
      '<p>We employ industry-standard security measures to protect your personal information and ensure it is kept confidential.</p>'
  },
  {
    title: 'Third-Party Sharing',
    content:
      '<p>We do not share your personal information with third parties, except for service providers who assist in fulfilling orders or improving our services.</p>'
  },
  {
    title: 'Cookies',
    content:
      '<p>We use cookies to enhance your experience on our website. By using our website, you consent to our use of cookies.</p>'
  },
  {
    title: 'Your Rights',
    content:
      '<p>You have the right to access, correct, or delete your personal data. You can also opt out of marketing communications at any time.</p>'
  }
];

const PrivacyPolicy = () => {
  return (
    <Stack>
      {privacyPolicies.map((pp, i) => (
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

export default PrivacyPolicy;
