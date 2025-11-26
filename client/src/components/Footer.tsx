import { SiInstagram } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-purple-900 to-blue-900 text-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          <div className="md:col-span-4">
            <img
              src="https://www.thefabulous.co/images/Logo---Round-Mask.webp"
              alt="The Fabulous"
              className="w-16 h-16 rounded-full mb-4"
            />
            <p className="text-white/80 text-sm leading-relaxed">
              Fabulous is a family of well-being apps that have already helped 37
              million users to build successful habits and improve their lives with behavioral science.
            </p>
          </div>

          <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-3 text-white">About</h3>
              <ul className="space-y-2">
                <li>
                  <a href="https://www.thefabulous.co/about-the-fabulous.html" className="text-white/80 hover:text-white text-sm" data-testid="link-story">
                    The Story of Fabulous
                  </a>
                </li>
                <li>
                  <a href="https://www.thefabulous.co/journey/fabulous-giving" className="text-white/80 hover:text-white text-sm" data-testid="link-giving">
                    Fabulous Giving
                  </a>
                </li>
                <li>
                  <a href="https://www.thefabulous.co/work/" className="text-white/80 hover:text-white text-sm" data-testid="link-teams">
                    Fabulous for Teams
                  </a>
                </li>
                <li>
                  <a href="https://blog.thefabulous.co/jobs-opening/" className="text-white/80 hover:text-white text-sm" data-testid="link-hiring">
                    We're Hiring
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-white">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="https://www.thefabulous.co/terms.html" className="text-white/80 hover:text-white text-sm" data-testid="link-terms">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="https://www.thefabulous.co/terms.html#privacy" className="text-white/80 hover:text-white text-sm" data-testid="link-privacy">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/80 hover:text-white text-sm" data-testid="link-cookies">
                    Cookie Preferences
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-white">Support</h3>
              <ul className="space-y-2">
                <li>
                  <a href="https://www.thefabulous.co/partner/redeem-your-code" className="text-white/80 hover:text-white text-sm" data-testid="link-redeem">
                    Redeem a Code
                  </a>
                </li>
                <li>
                  <a href="https://help.thefabulous.co/en/support/home" className="text-white/80 hover:text-white text-sm" data-testid="link-help">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="https://help.thefabulous.co/en/support/solutions/articles/101000406362" className="text-white/80 hover:text-white text-sm" data-testid="link-contact">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <a 
                href="https://www.instagram.com/thefabstory?igshid=OGQ5ZDc2ODk2ZA==" 
                className="flex items-center gap-2 text-white/80 hover:text-white text-sm"
                data-testid="link-instagram-fabulous"
              >
                <SiInstagram className="w-5 h-5" />
                <span>Fabulous</span>
              </a>
              <a 
                href="https://www.instagram.com/shapesesame?igshid=OGQ5ZDc2ODk2ZA==" 
                className="flex items-center gap-2 text-white/80 hover:text-white text-sm"
                data-testid="link-instagram-shape"
              >
                <SiInstagram className="w-5 h-5" />
                <span>Shape</span>
              </a>
            </div>
            <a 
              href="https://blog.thefabulous.co/" 
              className="text-white/80 hover:text-white text-sm"
              data-testid="link-blog"
            >
              Blog
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
