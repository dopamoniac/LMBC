import { useState, useCallback } from 'react';

interface CalculatorResult {
  size: string;
  details: string;
}

export const useCalculator = () => {
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculateSize = useCallback((age: string): CalculatorResult | null => {
    const ageNum = parseInt(age);
    if (isNaN(ageNum)) return null;

    if (ageNum <= 2) {
      return { size: '12 pouces', details: 'Pour les tout-petits (2-4 ans)' };
    } else if (ageNum === 3) {
      return { size: '14 pouces', details: 'Pour les jeunes enfants (3-5 ans)' };
    } else if (ageNum >= 4 && ageNum <= 6) {
      return { size: '16 pouces', details: 'Idéal (4-6 ans)' };
    } else if (ageNum >= 7 && ageNum <= 8) {
      return { size: '20 pouces', details: 'Pour les plus grands (5-8 ans)' };
    } else {
      return { size: '24 pouces', details: 'Enfants (7-10 ans)' };
    }
  }, []);

  const handleCalculate = useCallback((age: string) => {
    const calcResult = calculateSize(age);
    setResult(calcResult);
    return calcResult;
  }, [calculateSize]);

  const resetResult = useCallback(() => {
    setResult(null);
  }, []);

  return {
    result,
    handleCalculate,
    resetResult,
  };
};
