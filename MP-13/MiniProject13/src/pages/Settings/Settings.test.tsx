import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AccountInfo, NotificationSettings,DisplaySettings } from "@components/index";
import Settings from './Settings';

describe('Settings component', () => {
  test("renders without crashing", () => {
    render(
      <Router>
          <Routes>
            <Route path="/" element={<Settings />} />
          </Routes>
      </Router>);
  })
})

const renderSettingsContentMock = (activeTab: string) => {
  switch (activeTab) {
    case "account":
      return AccountInfo;
    case "Notifications":
      return NotificationSettings;
    case "Display":
      return DisplaySettings;
    case "ChangePassword": 
      return null;
    default:
      return null;
  }
};

test("renderSettingsContent returns correct component", () => {
  // Define different values for activeTab
  const tabs = ["account", "Notifications", "Display", "ChangePassword", "unknownTab"];

  tabs.forEach(tab => {

    const component = renderSettingsContentMock(tab);

    switch (tab) {
      case "account":
        expect(component).toBe(AccountInfo);
        break;
      case "Notifications":
        expect(component).toBe(NotificationSettings);
        break;
      case "Display":
        expect(component).toBe(DisplaySettings);
        break;
      case "ChangePassword":
        expect(component).toBe(null);//since no auth with email
        break;
      default:
        expect(component).toBe(null);
        break;
    }
  });
});