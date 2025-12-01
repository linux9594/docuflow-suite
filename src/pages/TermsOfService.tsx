import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  const baseUrl = "https://linux9594.github.io/compressor-vk";
  
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Terms of Service",
        "item": `${baseUrl}/terms-of-service`
      }
    ]
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Terms of Service | PDF COMPRESSOR - Free Online Tool</title>
        <meta name="description" content="Terms of Service for PDF COMPRESSOR. Read our terms and conditions for using our free online PDF and image tools. User agreements and service terms." />
        <meta name="keywords" content="terms of service, terms and conditions, user agreement, service terms, pdf tools terms, usage policy" />
        <link rel="canonical" href={`${baseUrl}/terms-of-service`} />
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>
      <Header />
      
      <main className="flex-1 py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-black mb-8 text-foreground">Terms of Service</h1>
          
          <div className="bg-card rounded-xl p-8 border border-border space-y-6 text-foreground">
            <p className="text-muted-foreground">
              <strong>Effective Date:</strong> November 2024
            </p>

            <section>
              <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground mb-4">
                By accessing and using V.K Tools ("the Service"), you accept and agree to be bound by these 
                Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Description of Service</h2>
              <p className="text-muted-foreground mb-4">
                V.K Tools provides free, browser-based tools for PDF compression, image compression, format 
                conversion, PDF merging, PDF splitting, and related document processing services. All processing 
                is performed client-side in your web browser.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Use of Service</h2>
              <h3 className="text-lg font-semibold mb-3 text-foreground">3.1 Permitted Use</h3>
              <p className="text-muted-foreground mb-4">
                You may use our services for lawful purposes only. You agree to use the Service in compliance 
                with all applicable laws and regulations.
              </p>
              
              <h3 className="text-lg font-semibold mb-3 text-foreground">3.2 Prohibited Use</h3>
              <p className="text-muted-foreground mb-4">
                You agree NOT to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Use the Service for any illegal or unauthorized purpose</li>
                <li>Attempt to interfere with or disrupt the Service</li>
                <li>Attempt to gain unauthorized access to any part of the Service</li>
                <li>Use automated tools to access the Service without permission</li>
                <li>Process files containing malicious code or viruses</li>
                <li>Violate any intellectual property rights</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. User Content and Responsibility</h2>
              <p className="text-muted-foreground mb-4">
                <strong>Your Files:</strong> You retain all rights to the files you process using our Service. 
                We do not claim any ownership or rights to your content.
              </p>
              <p className="text-muted-foreground mb-4">
                <strong>Your Responsibility:</strong> You are solely responsible for the files you process and 
                their content. You warrant that you have the necessary rights to process any files you upload 
                to our Service.
              </p>
              <p className="text-muted-foreground mb-4">
                <strong>No Storage:</strong> Since all processing happens in your browser, we do not store your 
                files. You are responsible for downloading and backing up your processed files.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Intellectual Property</h2>
              <p className="text-muted-foreground mb-4">
                The Service, including its design, code, features, and functionality, is owned by V.K Tools 
                and protected by international copyright, trademark, and other intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Disclaimer of Warranties</h2>
              <p className="text-muted-foreground mb-4">
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT ANY WARRANTIES OF ANY KIND, EXPRESS 
                OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Warranties of merchantability or fitness for a particular purpose</li>
                <li>Warranties that the Service will be uninterrupted, secure, or error-free</li>
                <li>Warranties regarding the accuracy or reliability of results</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                We do not guarantee that our Service will meet your requirements or that defects will be corrected.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Limitation of Liability</h2>
              <p className="text-muted-foreground mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, V.K TOOLS SHALL NOT BE LIABLE FOR ANY INDIRECT, 
                INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Loss of profits, data, or use</li>
                <li>Loss of business opportunities</li>
                <li>Damage to your device or files</li>
                <li>Any other losses resulting from your use of the Service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Indemnification</h2>
              <p className="text-muted-foreground mb-4">
                You agree to indemnify and hold harmless V.K Tools from any claims, damages, losses, or expenses 
                arising from your use of the Service or violation of these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Service Availability</h2>
              <p className="text-muted-foreground mb-4">
                We strive to maintain the Service but do not guarantee uninterrupted availability. We may 
                modify, suspend, or discontinue any part of the Service at any time without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">10. Third-Party Links</h2>
              <p className="text-muted-foreground mb-4">
                Our Service may contain links to third-party websites. We are not responsible for the content, 
                privacy policies, or practices of any third-party sites.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">11. Changes to Terms</h2>
              <p className="text-muted-foreground mb-4">
                We reserve the right to modify these Terms at any time. Changes will be effective immediately 
                upon posting. Your continued use of the Service after changes constitutes acceptance of the 
                modified Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">12. Termination</h2>
              <p className="text-muted-foreground mb-4">
                We may terminate or suspend your access to the Service at any time, without notice, for any 
                reason, including violation of these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">13. Governing Law</h2>
              <p className="text-muted-foreground mb-4">
                These Terms shall be governed by and construed in accordance with applicable laws, without 
                regard to conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">14. Contact Information</h2>
              <p className="text-muted-foreground mb-4">
                If you have questions about these Terms, please contact us through the contact section on 
                our website.
              </p>
            </section>

            <section className="bg-primary/10 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">Summary</h3>
              <p className="text-muted-foreground">
                By using V.K Tools, you agree to use our services responsibly and legally. We provide free tools 
                "as is" without warranties. You're responsible for your files and their content. We're not liable 
                for any damages. Use common sense and respect intellectual property rights.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfService;