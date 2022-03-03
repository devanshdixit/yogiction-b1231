/* eslint-disable @next/next/no-img-element */
import * as React from 'react';
import classNames from 'classnames';
import { getComponent } from '../../components-registry';
import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';
import { getDataAttrs } from '../../../utils/get-data-attrs';
import { Action, Badge } from '../../atoms';

export default function HeroSection(props) {
    const cssId = props.elementId || null;
    const colors = props.colors || 'colors-a';
    const sectionStyles = props.styles?.self || {};
    const titleStyles = props.styles?.title || {};
    const sectionWidth = sectionStyles.width || 'wide';
    const sectionHeight = sectionStyles.height || 'auto';
    const sectionJustifyContent = sectionStyles.justifyContent || 'center';
    const sectionFlexDirection = sectionStyles.flexDirection || 'row';
    const sectionAlignItems = sectionStyles.alignItems || 'center';
    const bgImage = props.backgroundImage || '';
    const logo = props.logo || '';
    const title = props.title || '';
    return (
        <>
            <div
                id={cssId}
                {...getDataAttrs(props)}
                style={{
                    borderWidth: sectionStyles.borderWidth ? `${sectionStyles.borderWidth}px` : null,
                    backgroundImage: `url('${bgImage.url}')`,
                }}
                className={classNames(
                    'sb-component',
                    'sb-component-section',
                    'sb-component-hero-section',
                    colors,
                    'flex',
                    'flex-col',
                    'justify-center',
                    mapMinHeightStyles(sectionHeight),
                    sectionStyles.margin,
                    'bg-no-repeat bg-center bg-cover',
                    'pl-[39px] md:pl-[140px] pt-[25px] md:pt-[100px] pb-[20px] md:pb-[209px] pr-1',
                    sectionStyles.borderColor,
                    sectionStyles.borderStyle ? mapStyles({ borderStyle: sectionStyles.borderStyle }) : 'border-none',
                    sectionStyles.borderRadius ? mapStyles({ borderRadius: sectionStyles.borderRadius }) : null
                )}
            >
                <div>
                    <div>
                        <img src={logo.url} className="h-[50px] w-[94px] md:h-[142px] md:w-[284px]" alt="" />
                        <div style={titleStyles} className={classNames('mt-[15px]  md:mt-[85px] text-[40px] leading-[50px] md:leading-[120px] md:text-[100px]',
                            "max-w-[300px]  md:max-w-[805px] ")}>{title}</div>
                    </div>
                    <div>{heroActions(props)}</div>
                    {/* <div className={classNames('flex', 'w-full', mapStyles({ justifyContent: sectionJustifyContent }))}>
                <div className={classNames('w-full', mapMaxWidthStyles(sectionWidth))}>
                    <div
                        className={classNames(
                            'flex',
                            mapFlexDirectionStyles(sectionFlexDirection),
                            mapStyles({ alignItems: sectionAlignItems }),
                            'space-y-8',
                            {
                                'lg:space-y-0 lg:space-x-8': sectionFlexDirection === 'row',
                                'space-y-reverse lg:space-y-0 lg:space-x-8 lg:space-x-reverse': sectionFlexDirection === 'row-reverse',
                                'space-y-reverse': sectionFlexDirection === 'col-reverse'
                            }
                        )}
                    >
                        <div className="flex-1 w-full">
                            {heroBody(props)}
                            {heroActions(props)}
                        </div>
                        {props.media && (
                            <div className="flex-1 w-full">
                                
                            {heroActions(props)}
                            </div>
                        )}
                    </div>
                </div>
            </div> */}
                </div>
            </div>

            <div className={classNames("block md:hidden w-full bg-[#2c5d87] py-[24px] flex justify-center")}>
                <div className='text-[25px] leading-[25px] text-white text-center'>SIGN UP NOW</div>
            </div>
        </>
    );
}

function Media({ media }: { media: any }) {
    const modelName = media.__metadata.modelName;
    if (!modelName) {
        throw new Error(`hero section media does not have the 'modelName' property`);
    }
    const MediaComponent = getComponent(modelName);
    if (!MediaComponent) {
        throw new Error(`no component matching the hero section media model name: ${modelName}`);
    }
    return <MediaComponent {...media} data-sb-field-path=".media" />;
}

function heroBody(props) {
    const styles = props.styles || {};
    return (
        <div>
            {props.badge && <Badge {...props.badge} data-sb-field-path=".badge" />}
            {props.title && (
                <h2 className={classNames('h1', styles.title ? mapStyles(styles.title) : null, { 'mt-4': props.badge?.label })} data-sb-field-path=".title">
                    {props.title}
                </h2>
            )}
            {/* {props.subtitle && (
                <p
                    className={classNames('text-xl', 'sm:text-2xl', styles.subtitle ? mapStyles(styles.subtitle) : null, { 'mt-4': props.title })}
                    data-sb-field-path=".subtitle"
                >
                    {props.subtitle}
                </p>
            )}
            {props.text && (
                <Markdown
                    options={{ forceBlock: true, forceWrapper: true }}
                    className={classNames('sb-markdown', 'sm:text-lg', styles.text ? mapStyles(styles.text) : null, { 'mt-6': props.title || props.subtitle })}
                    data-sb-field-path=".text"
                >
                    {props.text}
                </Markdown>
            )} */}
        </div>
    );
}

function heroActions(props) {
    const actions = props.actions || [];
    if (actions.length === 0) {
        return null;
    }
    const styles = props.styles || {};
    const actionStyle = props.styles.actions || {};
    return (
        <>
            <div
                className={classNames('overflow-x-hidden hidden md:block', {
                    'mt-8': props.title || props.subtitle || props.text || props.badge
                })}
            >
                <div
                    className={classNames('flex', 'flex-wrap', 'items-center', '-mx-2', styles.actions ? mapStyles(styles.actions) : null)}
                    data-sb-field-path=".actions"
                    style={actionStyle}
                >
                    {actions.map((action, index) => (
                        <Action key={index} {...action} className="mb-3 mx-2 lg:whitespace-nowrap" data-sb-field-path={`.${index}`} />
                    ))}
                </div>
            </div>
        </>
    );
}

function mapMinHeightStyles(height) {
    switch (height) {
        case 'screen':
            return 'min-h-screen';
    }
    return null;
}

function mapMaxWidthStyles(width) {
    switch (width) {
        case 'narrow':
            return 'max-w-screen-md';
        case 'wide':
            return 'max-w-screen-xl';
        case 'full':
            return 'max-w-full';
    }
    return null;
}

function mapFlexDirectionStyles(flexDirection) {
    switch (flexDirection) {
        case 'row':
            return ['flex-col', 'lg:flex-row'];
        case 'row-reverse':
            return ['flex-col-reverse', 'lg:flex-row-reverse'];
        case 'col':
            return ['flex-col'];
        case 'col-reverse':
            return ['flex-col-reverse'];
    }
    return null;
}
