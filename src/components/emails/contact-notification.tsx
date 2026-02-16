import * as React from 'react';
import {
  Html,
  Body,
  Head,
  Heading,
  Container,
  Preview,
  Section,
  Text,
  Hr,
  Tailwind,
} from '@react-email/components';
import { ContactFormData } from '@/lib/types/contact';

interface ContactNotificationEmailProps {
  data: ContactFormData;
}

export const ContactNotificationEmail: React.FC<ContactNotificationEmailProps> = ({ data }) => (
  <Html>
    <Head />
    <Preview>New inquiry from {data.name}</Preview>
    <Tailwind>
      <Body className="bg-white font-sans text-gray-900">
        <Container className="mx-auto max-w-[580px] pb-12 pt-5">
          <Section className="px-6">
            <Heading as="h1" className="pt-4 text-2xl font-semibold leading-tight text-gray-800">
              New Inquiry: {data.name}
            </Heading>

            <Text className="text-gray-700">
              <strong>Email:</strong> {data.email}
            </Text>
            {data.phone && (
              <Text className="text-gray-700">
                <strong>Phone:</strong> {data.phone}
              </Text>
            )}
            {data.referralSource && (
              <Text className="text-gray-700">
                <strong>Referral Source:</strong> {data.referralSource}
              </Text>
            )}
            {data.eventDate && (
              <Text className="text-gray-700">
                <strong>Event Date:</strong> {data.eventDate}
              </Text>
            )}
            {data.location && (
              <Text className="text-gray-700">
                <strong>Location:</strong> {data.location}
              </Text>
            )}

            <Hr className="my-8 border-gray-300" />

            <Heading as="h3" className="mb-2 mt-5 text-lg font-semibold">
              Message:
            </Heading>
            <Text className="mb-4 whitespace-pre-wrap rounded bg-gray-100 p-3 text-[15px] leading-snug text-gray-700">
              {data.message}
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);
