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
  Link,
  Tailwind,
} from '@react-email/components';

export interface ContactConfirmationEmailProps {
  name: string;
  greeting: string;
  body1: string;
  body2: string;
  closing: string;
  signature: string;
}

export const ContactConfirmationEmail: React.FC<ContactConfirmationEmailProps> = ({
  name,
  greeting,
  body1,
  body2,
  closing,
  signature,
}) => (
  <Html>
    <Head />
    <Preview>{greeting.replace('{name}', name)}</Preview>
    <Tailwind>
      <Body className="bg-white font-sans text-gray-900">
        <Container className="mx-auto max-w-[580px] pb-12 pt-5">
          <Section className="px-6">
            <Heading as="h1" className="pt-4 text-2xl font-normal leading-tight text-gray-800">
              {greeting.replace('{name}', name)}
            </Heading>
            <Text className="mb-4 text-[15px] leading-snug text-gray-700">{body1}</Text>
            <Text className="mb-4 text-[15px] leading-snug text-gray-700">{body2}</Text>
            <Link href="https://anitadajka.com" className="text-sm text-blue-600 underline">
              anitadajka.com
            </Link>
            <Hr className="mb-6 mt-10 border-gray-300" />
            <Text className="mb-4 text-[15px] leading-snug text-gray-700">
              {closing}
              <br />
              {signature}
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);
