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
	const [formState, setFormState] = useState({
		fontFamilyOption: appliedState.fontFamilyOption,
		fontColor: appliedState.fontColor,
		backgroundColor: appliedState.backgroundColor,
		contentWidth: appliedState.contentWidth,
		fontSizeOption: appliedState.fontSizeOption,
	});

	const handleApply = () => {
		onApply(formState);
	};

	const handleReset = () => {
		// reset to the initial state captured when the component mounted
		setFormState(initialState);
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

	const sidebarRef = React.useRef<HTMLElement>(null);

	const handleOnChange =
		(field: keyof typeof formState) => (value: OptionType) => {
			setFormState((prev) => ({ ...prev, [field]: value }));
		};

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
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleOnChange('fontFamilyOption')}
						placeholder='Семейство шрифта'
						title='Шрифт'
					/>

					{/* Добавьте остальные Select‑ы по аналогии, если нужно */}
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={handleOnChange('fontSizeOption')}
						title='Размер шрифта'
					/>
					<Select
						selected={formState.fontColor}
						options={fontColors}
						onChange={handleOnChange('fontColor')}
						placeholder='Цвет шрифта'
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={handleOnChange('backgroundColor')}
						placeholder='Цвет фона'
						title='Цвет фона'
					/>
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={handleOnChange('contentWidth')}
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
