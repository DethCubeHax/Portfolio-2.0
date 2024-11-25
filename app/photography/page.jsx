"use client";
import React, { useState, useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import photos from '../../public/photography.json';
import * as Icons from 'react-icons/fa';
import exifr from 'exifr';

const TimelineItem = ({ item }) => {
  const [Icon, setIcon] = useState(null);
  const [exifData, setExifData] = useState(null);

  useEffect(() => {
    const loadIcon = async () => {
      try {
        const { [item.icon]: LoadedIcon } = Icons;
        setIcon(() => LoadedIcon);
      } catch (error) {
        console.error(`Icon ${item.icon} not found`, error);
      }
    };

    const loadExifData = async () => {
      try {
        const exif = await exifr.parse(item.filename);
        setExifData(exif);
      } catch (error) {
        console.error('Failed to load EXIF data', error);
      }
    };

    loadIcon();
    loadExifData();
  }, [item.icon, item.filename]);

  return (
    <div className="flex gap-x-3 animate-fadeInDown" style={{ animationDelay: `${item.index * 0.1}s` }}>
      <div className="relative">
        <div className="relative z-10 flex flex-col items-center justify-center text-center" style={{ height: '4rem', width: '4rem' }}>
          {Icon ? <Icon className="text-4xl text-orange-500" /> : <div>Loading...</div>}
        </div>
        <div className="absolute inset-0 top-14 flex items-start justify-center">
          <div className="w-px h-full bg-gray-200 dark:bg-neutral-700"></div>
        </div>
      </div>
      <div className="grow pt-0.5 pb-8">
        <h3 className="font-semibold text-highlight text-2xl">{item.title}</h3>
        {exifData && exifData.GPSLatitude && exifData.GPSLongitude && (
          <span className="text-text text-lg">{`Location: ${exifData.GPSLatitude}, ${exifData.GPSLongitude}`}</span>
        )}
        {exifData && exifData.DateTimeOriginal && (
          <span className="text-text text-lg">{`${new Date(exifData.DateTimeOriginal).toLocaleDateString()}`}</span>
        )}
        <div className="mt-2 text-gray-600 dark:text-neutral-200 text-justify">
          <img src={item.filename} alt={item.description} className="w-full max-w-2xl mx-auto h-auto rounded-lg mb-2" style={{ maxWidth: '50%' }} />
        </div>
      </div>
    </div>
  );
};

const Photography = () => {
  const groupedPhotos = photos.reduce((acc, photo) => {
    if (!acc[photo.group]) {
      acc[photo.group] = [];
    }
    acc[photo.group].push(photo);
    return acc;
  }, {});

  return (
    <PageLayout title="My Photography">
      <div>
        {Object.entries(groupedPhotos).map(([group, groupPhotos], idx) => (
          <div key={idx}>
            <h1 className="text-4xl font-bold mb-6">{group}</h1>
            {groupPhotos.map((photo, idx) => (
              <TimelineItem key={idx} item={{ ...photo, index: idx }} />
            ))}
          </div>
        ))}
      </div>
    </PageLayout>
  );
};

export default Photography;
