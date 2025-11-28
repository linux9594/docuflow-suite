import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-black mb-8 text-foreground">Privacy Policy</h1>
          
          <div className="bg-card rounded-xl p-8 border border-border space-y-6 text-foreground">
            <p className="text-muted-foreground">
              <strong>Effective Date:</strong> November 2024
            </p>

            <section>
              <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
              <p className="text-muted-foreground mb-4">
                Welcome to V.K Tools ("we," "our," or "us"). We are committed to protecting your privacy. 
                This Privacy Policy explains how we handle information when you use our online PDF and image tools.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
              <p className="text-muted-foreground mb-4">
                <strong>We do NOT collect, store, or transmit your files.</strong> All file processing happens 
                entirely in your web browser using client-side JavaScript. Your files never leave your device.
              </p>
              <p className="text-muted-foreground mb-4">
                We may collect limited, non-personal information such as:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Browser type and version</li>
                <li>Device information</li>
                <li>General location (country/region level)</li>
                <li>Pages visited and time spent on our website</li>
                <li>Referring website</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                This information is collected through standard web analytics and is used solely to improve our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. How We Use Information</h2>
              <p className="text-muted-foreground mb-4">
                The limited analytics data we collect is used to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Understand how users interact with our tools</li>
                <li>Improve user experience and functionality</li>
                <li>Identify and fix technical issues</li>
                <li>Monitor website performance</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Your Files and Data Security</h2>
              <p className="text-muted-foreground mb-4">
                <strong>Complete Privacy:</strong> All PDF and image processing happens locally in your browser. 
                We never upload, store, or have access to your files. Your documents remain on your device at all times.
              </p>
              <p className="text-muted-foreground mb-4">
                <strong>No Server Processing:</strong> Unlike many online tools, we do not send your files to any server. 
                Everything is processed client-side using modern web technologies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Cookies</h2>
              <p className="text-muted-foreground mb-4">
                We may use cookies and similar technologies for:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Remembering your preferences</li>
                <li>Analytics purposes (via third-party services like Google Analytics)</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                You can disable cookies in your browser settings, though some features may not work properly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Third-Party Services</h2>
              <p className="text-muted-foreground mb-4">
                We may use third-party analytics services (such as Google Analytics) to understand website usage. 
                These services may collect information about your visit, but they do not have access to your files.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Children's Privacy</h2>
              <p className="text-muted-foreground mb-4">
                Our services are not directed to children under 13. We do not knowingly collect personal 
                information from children.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Changes to This Policy</h2>
              <p className="text-muted-foreground mb-4">
                We may update this Privacy Policy from time to time. Any changes will be posted on this page 
                with an updated effective date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions about this Privacy Policy, please contact us through the contact 
                section on our website.
              </p>
            </section>

            <section className="bg-primary/10 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">Summary</h3>
              <p className="text-muted-foreground">
                <strong>Your privacy is our priority.</strong> We don't store your files, we don't track your 
                documents, and all processing happens on your device. You can use our tools with complete confidence 
                that your data remains private and secure.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;