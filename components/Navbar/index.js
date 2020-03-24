import style from './style.module.css'


const Navbar = ({children, onClick, ...props}) => {
    const [selectedElement, setSelectedElement] = React.useState(0)

    return (<div className={style['navbarHighliter']}>
            <div className={style['navbarHighliter__itemsBox']}>
                {children.map((htmlElement, index) => {

                    return <div 
                        key={'NavbarKey-' + htmlElement.props.children} 
                        className={getElementsCompoundClassName(index, selectedElement)}
                        onClick={e => { onClick(htmlElement.props.screenName); setSelectedElement(index) } }>
                            {htmlElement}
                        </div>
                })}
            </div>
            <div className={style['navbarHighliter__frameBox']}>
                <div className={style['navbarHighliter__highlightFrame'] + '  ' + style['navbarHighliter__highlightFrame--' + selectedElement] }>&nbsp;</div>
            </div>
    </div>)
}

const getElementsCompoundClassName = (index, selectedElement) => {
    if (index === selectedElement)
        return style['navbarHighliter__item'] + '  ' + style['navbarHighliter__item--selected']
    else 
        return style['navbarHighliter__item']
}

export default Navbar
// setSelectedElement(index);