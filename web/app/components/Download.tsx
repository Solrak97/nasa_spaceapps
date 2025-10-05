import React from 'react';
import { Button } from './Button';
import { tw } from '../theme';

interface DownloadOption {
  platform: string;
  icon: string | React.ReactNode;
  version?: string;
  size?: string;
  url?: string;
  comingSoon?: boolean;
}

interface DownloadSectionProps {
  title?: string;
  description?: string;
  subtitle?: string;
  downloads?: DownloadOption[];
  comingSoon?: boolean;
  releaseDate?: string;
  className?: string;
}

/**
 * Download section for VR demo and releases
 * 
 * @example
 * ```tsx
 * <DownloadSection
 *   title="Download Deep Ocean VR"
 *   description="Experience the ocean depths in virtual reality"
 *   comingSoon
 *   releaseDate="Coming Soon"
 *   downloads={[
 *     { platform: 'Meta Quest', icon: '🥽', comingSoon: true },
 *     { platform: 'PC VR', icon: '💻', comingSoon: true }
 *   ]}
 * />
 * ```
 */
export function DownloadSection({
  title = 'Download VR Experience',
  description = 'Get the latest version of our virtual reality ocean exploration experience',
  subtitle,
  downloads = [],
  comingSoon = false,
  releaseDate,
  className = '',
}: DownloadSectionProps) {
  return (
    <section id="download" className={`py-20 ${className}`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent ${tw.gradient.text}`}>
            {title}
          </h2>
          {subtitle && (
            <p className={`text-xl ${tw.text.accent} mb-4 font-semibold`}>
              {subtitle}
            </p>
          )}
          {description && (
            <p className={`text-lg ${tw.text.secondary} max-w-3xl mx-auto mb-8`}>
              {description}
            </p>
          )}
          
          {/* Coming Soon Badge */}
          {comingSoon && (
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#012d3a] border-2 border-[#85c6cf] rounded-full mb-8">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#85c6cf] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#85c6cf]"></span>
              </span>
              <span className={`${tw.text.accent} font-bold text-lg`}>
                {releaseDate || 'Coming Soon'}
              </span>
            </div>
          )}
        </div>

        {/* Download Options Grid */}
        {downloads.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            {downloads.map((download, index) => (
              <DownloadCard key={index} {...download} />
            ))}
          </div>
        ) : (
          /* Default platforms when none specified */
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
            <DownloadCard platform="Meta Quest 2/3" icon="🥽" comingSoon />
            <DownloadCard platform="PC VR (SteamVR)" icon="💻" comingSoon />
            <DownloadCard platform="Windows" icon="🪟" comingSoon />
            <DownloadCard platform="macOS" icon="🍎" comingSoon />
          </div>
        )}

        {/* Additional Info */}
        <div className={`text-center ${tw.bg.card} ${tw.border.medium} rounded-2xl p-8 max-w-3xl mx-auto`}>
          <h3 className={`text-2xl font-bold mb-4 ${tw.text.primary}`}>
            System Requirements
          </h3>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div>
              <h4 className={`font-semibold ${tw.text.accent} mb-2`}>Minimum VR Setup</h4>
              <ul className={`${tw.text.secondary} text-sm space-y-1`}>
                <li>• OpenXR compatible VR headset</li>
                <li>• 8GB RAM</li>
                <li>• GTX 1060 / RX 580 or better</li>
                <li>• 2GB storage space</li>
              </ul>
            </div>
            <div>
              <h4 className={`font-semibold ${tw.text.accent} mb-2`}>Recommended</h4>
              <ul className={`${tw.text.secondary} text-sm space-y-1`}>
                <li>• Meta Quest 2/3 or PC VR</li>
                <li>• 16GB RAM</li>
                <li>• RTX 2060 / RX 5700 or better</li>
                <li>• SSD recommended</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface DownloadCardProps extends DownloadOption {}

/**
 * Individual download card for a platform
 */
function DownloadCard({
  platform,
  icon,
  version,
  size,
  url,
  comingSoon = false,
}: DownloadCardProps) {
  const cardContent = (
    <>
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className={`text-xl font-bold mb-2 ${tw.text.accent}`}>
        {platform}
      </h3>
      {version && (
        <p className={`text-sm ${tw.text.secondary} mb-1`}>
          Version {version}
        </p>
      )}
      {size && (
        <p className={`text-xs ${tw.text.secondary} opacity-75`}>
          {size}
        </p>
      )}
      {comingSoon && (
        <div className={`mt-3 px-3 py-1 ${tw.bg.secondary} ${tw.border.subtle} rounded-full inline-block`}>
          <span className={`text-xs ${tw.text.accent} font-semibold`}>
            Coming Soon
          </span>
        </div>
      )}
    </>
  );

  if (comingSoon || !url) {
    return (
      <div className={`
        ${tw.bg.card}
        p-6 rounded-xl
        ${tw.border.medium}
        text-center
        opacity-75
        cursor-not-allowed
        shadow-lg
      `}>
        {cardContent}
      </div>
    );
  }

  return (
    <a
      href={url}
      download
      className={`
        group
        ${tw.bg.card}
        p-6 rounded-xl
        ${tw.border.medium}
        hover:${tw.border.strong}
        text-center
        transition-all
        shadow-lg
        hover:shadow-xl
        hover:transform
        hover:scale-105
        block
      `}
    >
      {cardContent}
      <div className={`mt-4 ${tw.text.primary} font-semibold text-sm group-hover:${tw.text.accent} transition-colors`}>
        Download →
      </div>
    </a>
  );
}

interface QuickDownloadProps {
  mainDownloadUrl?: string;
  mainDownloadLabel?: string;
  comingSoon?: boolean;
  className?: string;
}

/**
 * Compact download CTA for sidebar or footer
 * 
 * @example
 * ```tsx
 * <QuickDownload
 *   mainDownloadLabel="Download for Quest"
 *   comingSoon
 * />
 * ```
 */
export function QuickDownload({
  mainDownloadUrl,
  mainDownloadLabel = 'Download Demo',
  comingSoon = false,
  className = '',
}: QuickDownloadProps) {
  return (
    <div className={`${tw.bg.card} ${tw.border.medium} p-6 rounded-xl shadow-lg ${className}`}>
      <h3 className={`text-lg font-bold ${tw.text.primary} mb-3`}>
        Ready to Explore?
      </h3>
      {comingSoon ? (
        <>
          <p className={`text-sm ${tw.text.secondary} mb-4`}>
            Our VR demo is coming soon!
          </p>
          <div className={`w-full px-6 py-3 ${tw.bg.secondary} ${tw.border.subtle} rounded-lg text-center font-semibold ${tw.text.secondary} cursor-not-allowed opacity-75`}>
            {mainDownloadLabel}
          </div>
        </>
      ) : (
        <>
          <p className={`text-sm ${tw.text.secondary} mb-4`}>
            Download our VR experience now
          </p>
          <Button
            variant="primary"
            href={mainDownloadUrl || '#download'}
            fullWidth
          >
            {mainDownloadLabel}
          </Button>
        </>
      )}
    </div>
  );
}

