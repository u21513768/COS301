import { render  } from '@testing-library/react';
import { describe, expect, test, } from 'vitest';
import SignUp from './SignUp';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


//=======================================================================================================================================
//Mock days in mouth function
const daysInMonth = (selectedMonth: string, selectedYear: string): number => {
    const monthItems = [
      { key: 'January', days: 31 },
      { key: 'February', days: 28 },
      { key: 'March', days: 31 },
      { key: 'April', days: 30 },
      { key: 'May', days: 31 },
      { key: 'June', days: 30 },
      { key: 'July', days: 31 },
      { key: 'August', days: 31 },
      { key: 'September', days: 30 },
      { key: 'October', days: 31 },
      { key: 'November', days: 30 },
      { key: 'December', days: 31 }
    ];

    const selectedMonthItem = monthItems.find(item => item.key === selectedMonth);
    if (selectedMonthItem) {
      if (selectedMonthItem.key === 'February') {
        // Check if it's a leap year
         const isLeapYear = (year: number): boolean => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
        const yearNumber = parseInt(selectedYear, 10);
        return isLeapYear(yearNumber) ? 29 : 28;
      } else {
        return selectedMonthItem.days;
      }
    }
    return 31; 
};

//=======================================================================================================================================

// Mock data
/*const formDataMock = { name: 'John', email: 'john@example.com' };
const selectedDayMock = 'Day';
const selectedMonthMock = 'Month';
const selectedYearMock = 'Year';




// Mock functions
const createDateObjectMock = vi.fn();
const setFormDataMock = vi.fn();
const setFlowPageMock = vi.fn();
const handleNextPressedMock = ((e: any) => {
    e.preventDefault();
    if (formDataMock.name === "" || formDataMock.email === "") return;
    if (selectedDayMock === "Day" || selectedMonthMock === "Month" || selectedYearMock === "Year") return;
    setFormDataMock({ ...formDataMock, dob: createDateObjectMock(selectedDayMock, selectedMonthMock, selectedYearMock) });
    setFlowPageMock(3);
});*/



describe('HomePage component', () => {

    test("renders without crashing", () => {
      render(
        <Router>
            <Routes>
              <Route path="/" element={<SignUp />} />
            </Routes>
        </Router>);
    })

    test('returns correct number of days for February in a leap year', () => {
        const selectedMonth: string = 'February';
        const selectedYear: string = '2024'; 
        expect(daysInMonth(selectedMonth, selectedYear)).toBe(29);
    });
    
    test('returns correct number of days for February in a non-leap year', () => {
        const selectedMonth: string = 'February';
        const selectedYear: string = '2023'; 
        expect(daysInMonth(selectedMonth, selectedYear)).toBe(28);
    });
    
    test('returns correct number of days for other months', () => {
        const selectedMonth: string = 'March';
        const selectedYear: string = '2024';
        expect(daysInMonth(selectedMonth, selectedYear)).toBe(31);
    });
    
      test('returns default number of days if month not found', () => {
        const selectedMonth: string = 'UnknownMonth';
        const selectedYear: string = '2024';
        expect(daysInMonth(selectedMonth, selectedYear)).toBe(31);
    });

    test('sets formData dob and flowPage correctly', () => {
        //const eventMock = { preventDefault: vi.fn() };

        //handleNextPressedMock(eventMock);
    
        //expect(setFormDataMock).toHaveBeenCalledWith({ ...formDataMock, dob: 'mockedDateObject' });
        //expect(setFlowPageMock).toHaveBeenCalledWith(3);
      });

});
