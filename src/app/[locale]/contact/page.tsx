import { setRequestLocale } from 'next-intl/server';
import { ContactSection } from '@/components/sections/ContactSection';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata(locale, 'contact', '/contact');
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="pt-phi-4">
      <ContactSection />
    </div>
  );
}
