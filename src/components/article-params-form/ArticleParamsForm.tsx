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

import React, { useState } from 'react';

export const ArticleParamsForm = ({
	appliedState,
	onApply,
}: {
	appliedState: typeof defaultArticleState;
	onApply: (state: typeof defaultArticleState) => void;
}) => {
	const [isOpen, setIsOpen] = useState(false);
	// состояние параметров статьи
	const [selectedFontFamily, setSelectedFontFamily] = useState<OptionType>(
		appliedState.fontFamilyOption
	);
	const [selectedFontColor, setSelectedFontColor] = useState<OptionType>(
		appliedState.fontColor
	);
	const [selectedBgColor, setSelectedBgColor] = useState<OptionType>(
		appliedState.backgroundColor
	);
	const [selectedContentWidth, setSelectedContentWidth] = useState<OptionType>(
		appliedState.contentWidth
	);
	const [selectedFontSize, setSelectedFontSize] = useState<OptionType>(
		appliedState.fontSizeOption
	);

	const handleApply = () => {
		const newState = {
			fontFamilyOption: selectedFontFamily,
			fontColor: selectedFontColor,
			backgroundColor: selectedBgColor,
			contentWidth: selectedContentWidth,
			fontSizeOption: selectedFontSize,
		};
		onApply(newState);
	};

	const handleReset = () => {
		// reset to the initial state captured when the component mounted
		setSelectedFontFamily(initialState.fontFamilyOption);
		setSelectedFontColor(initialState.fontColor);
		setSelectedBgColor(initialState.backgroundColor);
		setSelectedContentWidth(initialState.contentWidth);
		setSelectedFontSize(initialState.fontSizeOption);
		onApply(initialState);
	};

	// capture the initial state on first render
	const initialState = React.useMemo(
		() => ({
			fontFamilyOption: defaultArticleState.fontFamilyOption,
			fontColor: defaultArticleState.fontColor,
			backgroundColor: defaultArticleState.backgroundColor,
			contentWidth: defaultArticleState.contentWidth,
			fontSizeOption: defaultArticleState.fontSizeOption,
		}),
		[]
	);

	const sidebarRef = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		if (!isOpen) return;
		const handleClickOutside = (e: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(e.target as Node)
			) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [isOpen]);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				ref={sidebarRef}
				className={`${styles.container} ${
					isOpen ? styles.container_open : ''
				}`}>
				<form className={styles.form} onSubmit={(e) => e.preventDefault()}>
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
						<Button
							title='Сбросить'
							htmlType='button'
							type='clear'
							onClick={handleReset}
						/>
						<Button
							title='Применить'
							htmlType='button'
							type='apply'
							onClick={handleApply}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
