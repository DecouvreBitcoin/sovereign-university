import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface LevelPickerProps {
  courseId: string;
}

export const LevelPicker: React.FC<LevelPickerProps> = ({ courseId }) => {
  const [selectedLevel, setSelectedLevel] = useState<string>('Beginner'); // Establecemos "Beginner" como nivel por defecto

  const levels = [
    { prefix: '100', name: 'Beginner' },
    { prefix: '200', name: 'Intermediate' },
    { prefix: '300', name: 'Avanced' },
  ];

  const handleLevelClick = (level: string) => {
    setSelectedLevel(t(level));
  };

  const { t } = useTranslation();
  return (
    <div className="my-4">
      <div className="flex space-x-2 text-base">
        <div className="my-3 flex flex-row gap-12">
          {levels.map((level, index) => (
            <div
              className="flex flex-row place-items-center space-x-2"
              key={index}
            >
              <div
                className={`flex h-8 w-14 place-items-center justify-center border-2 
              border-orange-500 text-base font-semibold uppercase lg:h-10 lg:w-16 lg:text-base  ${
                selectedLevel === level.name ? 'bg-orange-500' : 'bg-blue-1000'
              }`}
                onClick={() => handleLevelClick(t(level.name))}
              >
                {level.prefix}
              </div>
              <span className="w-1/2 text-base font-light capitalize lg:text-base">
                {level.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
