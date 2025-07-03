import Link from "next/link"

export default function Footer() {
  const footerSections = [
    {
      title: "About",
      links: [
        { name: "Our Story", href: "/about" },
        { name: "Team", href: "/team" },
        { name: "Publications", href: "/publications" },
        { name: "Acknowledgements", href: "/acknowledgements" },
      ],
    },
    {
      title: "Get Involved",
      links: [
        { name: "Volunteer", href: "/volunteer" },
        { name: "Educator Resources", href: "/education" },
        { name: "Mobile App", href: "/mobile" },
        { name: "Daily Zooniverse", href: "/daily" },
      ],
    },
    {
      title: "Build",
      links: [
        { name: "Project Builder", href: "/lab" },
        { name: "Developer API", href: "/dev" },
        { name: "Data Exports", href: "/data" },
        { name: "Panoptes", href: "/panoptes" },
      ],
    },
    {
      title: "Talk",
      links: [
        { name: "Zooniverse Talk", href: "/talk" },
        { name: "Blog", href: "/blog" },
        { name: "Twitter", href: "https://twitter.com/the_zooniverse" },
        { name: "Facebook", href: "https://facebook.com/therealzooniverse" },
      ],
    },
  ]

  return (
    <footer className="bg-slate-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-lg mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href={link.href} className="text-slate-300 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">Z</span>
              </div>
              <span className="font-bold text-lg">ZOONIVERSE</span>
            </div>
            <div className="text-slate-400 text-sm">© 2024 Zooniverse. All rights reserved.</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
