import { Divider, Stack, Text } from '@mantine/core';
import { Fragment } from 'react/jsx-runtime';

const termsOfServices = [
  {
    title: 'Terms of Services',
    content:
      '<p>Welcome to our website! By accessing or using our services, you agree to abide by these Terms and Conditions.</p>'
  },
  {
    title: 'Acceptance of Terms',
    content:
      '<p>By using our services, you agree to the terms outlined in this agreement. If you do not agree, you should not use the services.</p>'
  },
  {
    title: 'User Responsibilities',
    content:
      '<p>You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account.</p>'
  },
  {
    title: 'Prohibited Activities',
    content:
      '<p>You agree not to engage in illegal, harmful, or disruptive activities while using our website or services, including but not limited to spamming, hacking, and fraud.</p>'
  },
  {
    title: 'Payment Terms',
    content:
      '<p>All payments for services are due at the time of purchase. We accept a variety of payment methods, and payments are processed securely.</p>'
  },
  {
    title: 'Intellectual Property',
    content:
      '<p>All content, trademarks, logos, and intellectual property on our website are owned by us or our licensors. You may not use them without permission.</p>'
  },
  {
    title: 'Limitation of Liability',
    content:
      '<p>We are not liable for any damages or losses arising from the use of our website or services, except as required by applicable law.</p>'
  },
  {
    title: 'Termination',
    content:
      '<p>We may suspend or terminate your access to our services at any time if you violate these terms or engage in unlawful activities.</p>'
  },
  {
    title: 'Governing Law',
    content:
      '<p>These Terms and Conditions are governed by the laws of the jurisdiction where our business is registered. Any disputes will be resolved in the courts of that jurisdiction.</p>'
  },
  {
    title: 'Amendments',
    content:
      '<p>We reserve the right to update or modify these Terms and Conditions at any time. You will be notified of any significant changes.</p>'
  }
];

const TermsOfService = () => {
  return (
    <Stack>
      {termsOfServices.map((ts, i) => (
        <Fragment key={i}>
          <Text fw={500}>{ts.title}</Text>
          <Text>
            <div
              className="dangerouslySetInnerHTML"
              dangerouslySetInnerHTML={{ __html: ts.content }}
            />
          </Text>
          <Divider size="sm" my="md" />
        </Fragment>
      ))}
    </Stack>
  );
};

export default TermsOfService;
