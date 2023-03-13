import React from 'react'
import { useStyles } from './styles';
import clsx from 'clsx';

const DrawBox = (props) => {
    const {  rect, drawMask, readOnly, deleteMask } = props;
    const classes = useStyles(props);
    const style = {
      width: `${props?.rect?.[props?.returnType?.width]}%`,
        height:  `${props?.rect?.[props?.returnType?.height]}%`,
        left:`${props?.rect?.[props?.returnType?.x]}%`,
        top:  `${props?.rect?.[props?.returnType?.y]}%`
    }
    // console.log(style)
  return (
    <div style={style} className={clsx(classes.localstyle ,classes.drawMaskBox)} onMouseDown={drawMask} data-wrapper="wrapper">
        {!readOnly && <div>
            <div data-dir="se" className={classes.resizeHandleSE}/>{/* width */}
            <div data-dir="sw" className={classes.resizeHandleSW}/>{/* height */}
            <div data-dir="ne" className={classes.resizeHandleNW}/>{/* x */}
            <div data-dir="nw" className={classes.resizeHandleNE}/>{/* y */}
        </div>}
        {!readOnly && <button data-button="button" onClick={() => deleteMask(rect)} className={classes?.deleteButton}>Delete</button>}
    </div>
  )
}

export default DrawBox