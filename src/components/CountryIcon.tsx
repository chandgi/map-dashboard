'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface CountryIconProps {
  countryCode: string;
  type?: 'flag' | 'map';
  className?: string;
  size?: number;
  fallback?: string;
}

interface FigmaAsset {
  id: string;
  name: string;
  type: 'flag' | 'map';
  countryCode: string;
  imageUrl?: string;
}

export default function CountryIcon({ 
  countryCode, 
  type = 'flag', 
  className = '', 
  size = 32,
  fallback 
}: CountryIconProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCountryIcon = async () => {
      try {
        setLoading(true);
        setError(false);
        
        // First try to use local files
        const localPath = `/assets/${type}s/${countryCode.toLowerCase()}.svg`;
        
        // Check if local file exists by trying to fetch it
        try {
          const localResponse = await fetch(localPath);
          if (localResponse.ok) {
            setImageUrl(localPath);
            setLoading(false);
            return;
          }
        } catch {
          console.log(`Local file not found: ${localPath}, trying Figma API`);
        }
        
        // Fallback to Figma API if local file doesn't exist
        const response = await fetch(
          `/api/figma-assets?type=${type}&countryCode=${countryCode}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch country icon');
        }
        
        const data = await response.json();
        
        if (data.assets && data.assets.length > 0) {
          // Find the first asset with a valid image URL
          const assetWithImage = data.assets.find((asset: FigmaAsset) => asset.imageUrl);
          if (assetWithImage) {
            setImageUrl(assetWithImage.imageUrl);
          } else {
            setError(true);
          }
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Error fetching country icon:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (countryCode) {
      fetchCountryIcon();
    }
  }, [countryCode, type]);

  if (loading) {
    return (
      <div 
        className={`bg-gray-200 animate-pulse rounded ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }

  if (error || !imageUrl) {
    return fallback ? (
      <div className={`flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
        <span className={`${size > 50 ? 'text-4xl' : size > 30 ? 'text-2xl' : 'text-xl'}`}>
          {fallback}
        </span>
      </div>
    ) : (
      <div 
        className={`bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg border-2 border-blue-300 flex items-center justify-center text-blue-700 font-bold shadow-sm ${className}`}
        style={{ width: size, height: size }}
      >
        <div className="text-center">
          <div className={`${size > 50 ? 'text-lg' : 'text-sm'} leading-tight`}>
            {countryCode}
          </div>
          {type === 'map' && (
            <div className="text-xs opacity-75">MAP</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <Image
        src={imageUrl}
        alt={`${countryCode} ${type}`}
        width={size}
        height={size}
        className="rounded object-cover shadow-sm"
        onError={() => setError(true)}
      />
    </div>
  );
}
