import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	OptionType,
	defaultArticleState,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

import { useState } from 'react';

export const ArticleParamsForm = () => {
	const [isOpen, setIsOpen] = useState(true);
	// состояние параметров статьи
	const [selectedFontFamily, setSelectedFontFamily] = useState<OptionType>(
		defaultArticleState.fontFamilyOption
	);
	const [selectedFontColor, setSelectedFontColor] = useState<OptionType>(
		defaultArticleState.fontColor
	);
	const [selectedBgColor, setSelectedBgColor] = useState<OptionType>(
		defaultArticleState.backgroundColor
	);
	const [selectedContentWidth, setSelectedContentWidth] = useState<OptionType>(
		defaultArticleState.contentWidth
	);
	const [selectedFontSize, setSelectedFontSize] = useState<OptionType>(
		defaultArticleState.fontSizeOption
	);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				className={`${styles.container} ${
					isOpen ? styles.container_open : ''
				}`}>
				<form className={styles.form}>
					<h3 className={styles.title}>Задайте параметры</h3>
					{/* Пример использования Select для выбора семейства шрифта */}
					<Select
						selected={selectedFontFamily}
						options={fontFamilyOptions}
						onChange={setSelectedFontFamily}
						placeholder='Семейство шрифта'
						title='Шрифт'
					/>

					{/* Добавьте остальные Select‑ы по аналогии, если нужно */}
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={selectedFontSize}
						onChange={setSelectedFontSize}
						title='Размер шрифта'
					/>
					<Select
						selected={selectedFontColor}
						options={fontColors}
						onChange={setSelectedFontColor}
						placeholder='Цвет шрифта'
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={selectedBgColor}
						options={backgroundColors}
						onChange={setSelectedBgColor}
						placeholder='Цвет фона'
						title='Цвет фона'
					/>
					<Select
						selected={selectedContentWidth}
						options={contentWidthArr}
						onChange={setSelectedContentWidth}
						placeholder='Ширина контента'
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
