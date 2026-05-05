"use client"

import { theme } from "@/lib/theme"

const iconMap: Record<string, any> = {
  truck: ({ size = 28, color = "#000" }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
  ),
  package: ({ size = 28, color = "#000" }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
  ),
  wrench: ({ size = 28, color = "#000" }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
  ),
}

export function Services() {
  return (
    <section
      id="services"
      className="py-20 px-4 md:px-12"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: theme.colors.accent }}
          >
            Servicios
          </h2>
          <h3
            className="text-2xl md:text-3xl font-semibold"
            style={{ color: theme.colors.text }}
          >
            Soluciones integrales para tu industria
          </h3>
          <p
            className="mt-4 max-w-2xl mx-auto"
            style={{ color: theme.colors.textMuted }}
          >
            Especialistas en equipos de izaje e integración vehicular, 
            ofreciendo soluciones llave en mano para cada necesidad.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {theme.hero.services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || iconMap.truck

            return (
              <div
                key={index}
                className="group p-6 rounded-xl transition-all duration-300 w-full"
                style={{
                  backgroundColor: theme.colors.secondary,
                  border: `1px solid ${theme.colors.border}`,
                  width: "100%",
                  maxWidth: "360px",
                  margin: "0 auto",
                }}
              >
                <div className="text-center">
                  <div
                    className="w-14 h-14 rounded-lg flex items-center justify-center mb-4 mx-auto transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${theme.colors.accent}20` }}
                  >
                    <IconComponent size={28} color={theme.colors.accent} />
                  </div>
                  <h3
                    className="text-xl font-bold mb-3"
                    style={{ color: theme.colors.text }}
                  >
                    {service.title}
                  </h3>
                  <p
                    className="text-sm mb-4"
                    style={{ color: theme.colors.textMuted }}
                  >
                    {service.description}
                  </p>
                </div>

                {service.details && (
                  <div 
                    className="mt-4 pt-4 border-t"
                    style={{ borderColor: theme.colors.border }}
                  >
                    <ul className="space-y-3">
                      {service.details.map((detail, idx) => (
                        <li 
                          key={idx} 
                          className="text-sm"
                          style={{ color: theme.colors.textMuted }}
                        >
                          • {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}