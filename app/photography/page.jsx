"use client";
import React, { useState, useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import photos from '../../public/photography.json';
import * as Icons from 'react-icons/fa';
import { FaMapMarkerAlt, FaCamera, FaEye, FaRulerVertical } from 'react-icons/fa';
import { IoIosAperture } from 'react-icons/io';
import { MdExposure } from 'react-icons/md';
import exifr from 'exifr';

const DescriptorButton = ({ IconComponent, value }) => (
  <div className="flex items-center gap-2 px-2 py-1 bg-white text-background font-semibold rounded-full no-underline transition duration-300">
    <div className="text-left">
      <IconComponent className="text-xl text-orange-500" />
    </div>
    <span className="text-xs font-light">{value}</span>
  </div>
);

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

  const formatExposureTime = (time) => {
    return Math.round(time * 1000);
  };

  return (
    <div className="flex gap-x-3 animate-fadeInDown mx-auto max-w-3xl" style={{ animationDelay: `${item.index * 0.1}s` }}>
      <div className="relative">
        <div className="relative z-10 flex flex-col items-center justify-center text-center" style={{ height: '4rem', width: '4rem' }}>
          {Icon ? <Icon className="text-4xl text-orange-500" /> : <div>Loading...</div>}
        </div>
        <div className="absolute inset-0 top-14 flex items-start justify-center">
          <div className="w-px h-full bg-gray-200 dark:bg-neutral-700"></div>
        </div>
      </div>
      <div className="grow pt-0.5 pb-8">
        <h3 className="font-semibold text-highlight text-3xl py-2">{item.title}</h3>
        {exifData && exifData.DateTimeOriginal && (
          <span className="text-xs font-medium uppercase text-text mt-1 block">{`${new Date(exifData.DateTimeOriginal).toLocaleDateString()}`}</span>
        )}
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-x-4 mt-2">
          <div className="w-full flex-auto lg:justify-center">
            <img src={item.filename} alt={item.description} className="w-full h-auto rounded-lg" style={{ maxHeight: '100%', maxWidth: '100%' }} />
            <p className="text-white text-2xl sm:text-3xl font-montserrat font-extralight mt-4 mb-6">{item.description}</p>
            {exifData && (
              <div className="mt-2 text-gray-600 dark:text-neutral-200 text-justify lg:text-left flex flex-wrap gap-2">
                <DescriptorButton 
                  IconComponent={FaCamera} 
                  value={exifData.ISO ? Math.round(exifData.ISO) : "N/A"} 
                />
                <DescriptorButton 
                  IconComponent={MdExposure} 
                  value={exifData.ExposureTime ? `${formatExposureTime(exifData.ExposureTime)} ms` : "N/A"} 
                />
                <DescriptorButton 
                  IconComponent={IoIosAperture} 
                  value={exifData.FNumber ? `f/${exifData.FNumber.toFixed(2)}` : "N/A"} 
                />
                <DescriptorButton 
                  IconComponent={FaRulerVertical} 
                  value={exifData.FocalLength ? `${exifData.FocalLength.toFixed(2)} mm` : "N/A"} 
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Photography = () => {
  const [selectedGroup, setSelectedGroup] = useState('Featured');
  const [groupedPhotos, setGroupedPhotos] = useState({});
  const [allPhotosSorted, setAllPhotosSorted] = useState([]);
  const [featuredPhotos, setFeaturedPhotos] = useState([]);

  useEffect(() => {
    const groups = photos.reduce((acc, photo) => {
      if (!acc[photo.group]) {
        acc[photo.group] = [];
      }
      acc[photo.group].push(photo);
      return acc;
    }, {});

    // Sort each group by date
    for (const group in groups) {
      groups[group].sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    setGroupedPhotos(groups);

    const sortedPhotos = photos.slice().sort((a, b) => new Date(a.date) - new Date(b.date));
    setAllPhotosSorted(sortedPhotos);

    const featured = photos.filter(photo => photo.featured);
    featured.sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort featured photos by date
    setFeaturedPhotos(featured);
  }, []);

  const handleGroupChange = (event) => {
    setSelectedGroup(event.target.value);
  };

  return (
    <PageLayout title="My Photography">
      <div className="flex flex-col items-center">
        <select 
          onChange={handleGroupChange} 
          value={selectedGroup} 
          className="mb-4 p-2 rounded-full border text-background bg-lightblue"
        >
          <option value="All">All</option>
          <option value="Featured">Featured</option>
          {Object.keys(groupedPhotos).map((group, index) => (
            <option key={index} value={group}>{group}</option>
          ))}
        </select>
        {selectedGroup === 'All' ? (
          <div className="w-full flex flex-col items-center">
            {allPhotosSorted.map((photo, idx) => (
              <TimelineItem key={idx} item={{ ...photo, index: idx }} />
            ))}
          </div>
        ) : selectedGroup === 'Featured' ? (
          <div className="w-full flex flex-col items-center">
            {featuredPhotos.map((photo, idx) => (
              <TimelineItem key={idx} item={{ ...photo, index: idx }} />
            ))}
          </div>
        ) : (
          <div className="w-full flex flex-col items-center">
            {groupedPhotos[selectedGroup].map((photo, idx) => (
              <TimelineItem key={idx} item={{ ...photo, index: idx }} />
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Photography;
