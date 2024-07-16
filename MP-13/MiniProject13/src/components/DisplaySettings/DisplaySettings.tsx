import React, { useState, useEffect } from 'react';
import {RadioGroup, Radio, cn} from "@nextui-org/react";
import { setTheme, getTheme } from "@services/index"
export const CustomRadio = (props: any) => {
  const {children, ...otherProps} = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
          "flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
          "data-[selected=true]:border-primary"
        ),
      }}
    >
      {children}
    </Radio>
  );
};


const DisplaySettings = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(null);

  useEffect(() => {
    const checkTheme = async () => {
      const theme = await getTheme();
      setIsDarkTheme(theme.Darkmode);
      console.log(theme);
    }
    
    // Call the async function
    checkTheme();
  }, []);


  // console.log(isDarkTheme);
  const handleThemeChange = async (theme :boolean) => {
    try {
      setIsDarkTheme(theme);
      const themechange = await setTheme(theme);
      console.log(themechange);
      window.location.reload();
    } catch (error) {
      console.error('Error changing theme', error);
    }
  }

  return (
    <div className="h-full bg-inherit p-6 rounded-lg">
      <h2 className="text-lg font-semibold mb-4 dark:text-white">Display</h2>
      <p className="text-gray-600 mb-6">
        Manage your background. These settings affect all the X accounts on this browser.
      </p>
      <div className="bg-gray-100 dark:bg-neutral-950 p-4 rounded-md mb-6">
        <p className="text-gray-600">
          At the heart of X are short messages called posts — just like this one — which can include photos, videos,
          links, text, hashtags, and mentions like @X.
        </p>
      </div>
      {/* <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">Font size</label>
        <div className="flex items-center">
          <span className="text-sm text-gray-500 mr-2">Aa</span>
          <input
            type="range"
            className="w-full"
            min="1"
            max="5"
            step="1"
            defaultValue="3"
          />
          <span className="text-sm text-gray-500 ml-2">Aa</span>
        </div>
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">Color</label>
        <div className="flex items-center">
          <button className="w-6 h-6 rounded-full mr-2 bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"></button>
          <button className="w-6 h-6 rounded-full mr-2 bg-yellow-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"></button>
          <button className="w-6 h-6 rounded-full mr-2 bg-pink-500 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500"></button>
          <button className="w-6 h-6 rounded-full mr-2 bg-purple-500 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"></button>
          <button className="w-6 h-6 rounded-full mr-2 bg-orange-500 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"></button>
          <button className="w-6 h-6 rounded-full mr-2 bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"></button>
        </div>
      </div> */}
      <div>
        <label className="block text-black dark:text-white text-lg font-semibold mb-2">Background</label>
        <div className="flex gap-8 mt-4">
          <div className={`h-12 w-40 border-2 rounded bg-white flex py-4 pl-6 ${isDarkTheme ? '' : 'border-sky-500'}`}>
            <label className="inline-flex items-center space-x-4">
              <input
                type="radio"
                value="default"
                checked={!isDarkTheme}
                onChange={() => handleThemeChange(false)}
                className="form-radio bg-white text-blue-500 focus:ring-blue-500 h-4 w-4 mr-3"
              />
              <span className="text-black text-lg font-semibold">Default</span>
           </label>
          </div>
          <div className={`h-12 w-40 border-2  rounded bg-black flex py-4 pl-6 ${isDarkTheme ? 'border-sky-500' : 'border-black'}`}>
            <label className="inline-flex items-center space-x-2">
              <input
                type="radio"
                value="dark"
                checked={isDarkTheme}
                onChange={() => handleThemeChange(true)}
                className="form-radio text-blue-500 focus:ring-blue-500 h-4 w-4 mr-3"
              />
              <span className="text-white text-md font-semibold">Lights out</span>
            </label>
          </div>  
        </div>
      </div>
    </div>
  );
};

export default DisplaySettings;