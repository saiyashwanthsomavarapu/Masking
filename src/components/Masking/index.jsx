/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import clsx from 'clsx';
import { useStyles } from './styles';
import DrawBox from './DrawBox';

export const convertPixelToPercentage = (obj, dimentions, returnType) => {
  const json = {
    x: 'xmin',
    height: 'xmax',
    y: 'ymin',
    width: 'ymax'
  }
  if (returnType === '%') {
    return {
      [json?.x]: Math.round((obj?.[json?.x] * 100) / dimentions.dimentionX),
      [json?.y]: Math.round((obj?.[json?.y] * 100) / dimentions.dimentionY),
      [json?.width]: Math.round((obj?.[json?.width] * 100) / dimentions.dimentionY) - Math.round((obj?.[json?.y] * 100) / dimentions.dimentionY),
      [json?.width]: Math.round((obj?.[json?.height] * 100) / dimentions.dimentionX) - Math.round((obj?.[json?.x] * 100) / dimentions.dimentionX),
    }
  } else if (returnType === 'px') {
    return {
      [json?.x]: Math.round((obj?.[json?.x] * dimentions.dimentionX) / 100),
      [json?.y]: Math.round((obj?.[json?.y] * dimentions.dimentionY) / 100),
      [json?.width]: Math.round((obj?.[json?.width] * dimentions.dimentionY) / 100) + Math.round((obj?.[json?.y] * dimentions.dimentionY) / 100),
      [json?.width]: Math.round((obj?.[json?.height] * dimentions.dimentionX) / 100) + Math.round((obj?.[json?.x] * dimentions.dimentionX) / 100),
    }
  }
}

const Masking = (props) => {
  const {
    returnFormat,
    masks,
    totalMasks,
    onChange,
    currentId,
    enableMask,
    customstyle,
    alt,
    ondeleteMask,
    readOnly,
    imageClassName,
    showMaskedAreaCount,
    hideMaskImage,
    hideImage,
    onLoad,
    onsaveMasks,
    onError,
    onClick
  } = props;
  const Ref = useRef(null);
  const classes = useStyles();
  const [isDraw, enableDraw] = useState(undefined);
  const [isFound, setIsFound] = useState(true);
  const [count, setCount] = useState(totalMasks ? totalMasks : 0);
  const [isDragging, setIsDragging] = useState(false);
  const [currentMask, setCurrentMask] = useState([]);
  const [maskData, setMaskData] = useState({});
  const [maskChangedIndex, setMaskChangedIndex] = useState(undefined);
  // eslint-disable-next-line no-unused-vars
  const [returnType, setReturnType] = useState(
    returnFormat
      ? returnFormat 
      : {
        x: 'x',
        height: 'height',
        y: 'y',
        width: 'width'
      }
  );

  useEffect(() => {
      document.addEventListener('mousemove', onMouseMoveStart);
      document.addEventListener('mouseup', onMouseMoveEnd);
      return () => {
        document.removeEventListener('mousemove', onMouseMoveStart);
        document.removeEventListener('mouseup', onMouseMoveEnd);
      }
  })

  useEffect(() => {
    setIsFound(true);
  },[hideImage]);

  const contextMenu = (e) => {
    e.preventDefault();
  }

  const getClientPos = (e) => {
    return {
      x: e.pageX,
      y: e.pageY
    }
  }

  const getOffsetValues = (e) => {
    const rect = e?.getBoundingClientRect?.();
    const element = {
      top: rect?.top,
      left: rect?.left
    }
    return element;
  }

  const onMouseMoveStart = (e) => {
    if (!isDraw) {
      return;
    }
    const index = maskChangedIndex;
    const updatingMask = currentMask[index];
    const clientPos = getClientPos(e);
    const maskChangeData = maskData;
    let x,y, width, height;
    if (!maskChangeData?.isMove) {
      let x1Pc = 0, y1Pc = 0, x2Pc = 0, y2Pc = 0;
      x1Pc = ((maskChangeData?.clientPosXStart - maskChangeData?.imageOffsetLeft) / maskChangeData?.imageWidth) * 100;
      y1Pc = ((maskChangeData?.clientPosYStart - maskChangeData?.imageOffsetTop) / maskChangeData?.imageHeigth) * 100;
      x2Pc = ((clientPos.x - maskChangeData?.imageOffsetLeft) / maskChangeData?.imageWidth) * 100;
      y2Pc = ((clientPos.y - maskChangeData?.imageOffsetTop) / maskChangeData?.imageHeigth) * 100;
      x = Math.min(x1Pc, x2Pc);
      y = Math.min(y1Pc, y2Pc);
      width = Math.abs(x1Pc - x2Pc);
      height = Math.abs(y1Pc - y2Pc);
      if (x2Pc >= 100) {
        x = x1Pc;
        width = 100 - x1Pc;
      }
      if (y2Pc >= 100) {
        y = y1Pc;
        height = 100 - y1Pc;
      }
      if (x2Pc <= 0) {
        x = 0;
        width = x1Pc;
      }
      if (y2Pc <= 0) {
        y = 0;
        height = y1Pc;
      }
    } else {
      x = (clientPos.x + maskChangeData.clientPosXOffset - maskChangeData.imageOffsetLeft) / maskChangeData.imageWidth * 100;
     
      console.log("x:=>",`((${clientPos?.x} + ${maskChangeData?.clientPosXOffset} - ${maskChangeData?.imageOffsetLeft}) / ${maskChangeData?.imageWidth}) * 100`, x)
     
      y = (clientPos.y + maskChangeData.clientPosYOffset - maskChangeData.imageOffsetTop) / maskChangeData.imageHeight * 100;
      console.log("y:=>s",`(${clientPos?.y} + ${maskChangeData?.clientPosYOffset} - ${maskChangeData?.imageOffsetTop}) / ${maskChangeData?.imageHeight}) * 100;`, y)
      width = updatingMask?.[returnType?.width];
      height = updatingMask?.[returnType?.height];

      if (x + width >= 100) {
        x = Math.round(100 - width);
      }
      if (y + height >= 100) {
        y = Math.round(100 - height);
      }
      if (x <= 0) {
        x = 0;
      }
      if (y <= 0) {
        y = 0;
      }
      // console.log(y)
    }
    console.log({
      x: x,
      y: y,
      width: width,
      height: height
    })
    const rect = {
      [returnType?.x]: Math.round(x),
      [returnType?.y]: Math.round(y),
      [returnType?.width]: Math.round(width),
      [returnType?.height]: Math.round(height),
      [returnType?.dimentionX]: Ref.current?.naturalWidth,
      [returnType?.dimentionY]: Ref.current?.naturalHeight
    }
    // console.log(rect)
    setIsDragging(true);
    if (!readOnly) {
      onChange([
        ...masks.slice(0, index),
        Object.assign(updatingMask, rect),
        ...masks.slice(index + 1),
      ], index)
    }
  }

  const onMouseMoveEnd = () => {
    if (isDraw) {
      enableDraw(false);
      const index = maskChangedIndex;
      const updatingMask = currentMask[index];
      setMaskChangedIndex(null);
      setMaskData(null);
      if (!readOnly && isDragging) {
        onChange([
          ...currentMask.slice(0, index),
          Object.assign(updatingMask, { isDragging: isDragging }),
          ...currentMask.slice(index + 1)
        ], index, true);
        setIsDragging(false);
      }
    }
  }

  const onMouseDown = (e) => {
    if (Object.keys(e.target.dataset).length > 0 || !enableMask) return;

    e.preventDefault();
    const clientPos = getClientPos(e);
    const offset = getOffsetValues(Ref.current);
    enableDraw(true);
    const rect = {
      [returnType?.x]: ((clientPos?.x - offset.left) / Ref.current?.offsetWidth) * 100,
      [returnType?.y]: ((clientPos?.y - offset.top) / Ref.current?.offsetHeight) * 100,
      [returnType?.width]: 0,
      [returnType?.height]: 0,
      [returnType?.dimentionX]: Ref.current?.naturalWidth,
      [returnType?.dimentionY]: Ref.current?.naturalHeight,
      saved: false,
      isDragged: false,
      imageSeqNo: currentId,
      data: { index: count }
    } 
    setCount((prev) => prev + 1);
    setMaskData({
      imageOffsetLeft: offset?.left,
      imageOffsetTop: offset?.top,
      clientPosXStart: clientPos?.x,
      clientPosYStart: clientPos?.y,
      imageWidth: Ref.current?.offsetWidth,
      imageHeigth: Ref.current?.offsetHeight,
      isMove: false
    });
    // console.log("currentMask",rect)
    if (!readOnly) {
      setCurrentMask(currentMask.concat(rect))
    }
    setMaskChangedIndex(masks.length);
  }

  const onBoxMoveStart = (e, index) => {
    if (!e.target.dataset.wrapper && !e.target.dataset.dir && !e.target.dataset.count && enableMask) {
      return;
    }
    e.preventDefault();
    const clientPos = getClientPos(e);
    const offset = getOffsetValues(Ref.current);
    let clientPosXStart, clientPosYStart;
    const currentposition = currentMask[index];
    const maskLeft = (currentposition?.[returnType?.x] / 100 * Ref.current?.offsetWidth) + offset?.left;
    const maskTop = (currentposition?.[returnType?.y] / 100 * Ref.current?.offsetHeight) + offset?.top;
    const maskWidth = (currentposition?.[returnType?.width] / 100 * Ref.current?.offsetWidth);
    const maskHeight = (currentposition?.[returnType?.height] / 100 * Ref.current?.offsetHeight);
    const clientPosDiffX = maskLeft - clientPos?.x;
    const clientPosDiffY = maskTop - clientPos?.y;

    const resizeDir = e.target.dataset.dir;
  
    if (resizeDir) {
      if (resizeDir === 'se') {
        clientPosXStart = maskLeft;
        clientPosYStart = maskTop;
      } else if (resizeDir === 'sw') {
        clientPosXStart = maskLeft + maskWidth;
        clientPosYStart = maskTop;
      } else if (resizeDir === 'nw') {
        clientPosXStart = maskLeft + maskWidth;
        clientPosYStart = maskTop + maskHeight;
      } else if (resizeDir === 'ne') {
        clientPosXStart = maskLeft;
        clientPosYStart = maskTop + maskHeight;
      }
    } else {
      clientPosXStart = clientPos?.x;
      clientPosYStart = clientPos?.y
    }
    console.log("offsetTop", offset.top)

    enableDraw(true);
    setMaskData({
      imageOffsetLeft: offset?.left,
      imageOffsetTop: offset?.top,
      clientPosXStart: clientPosXStart,
      clientPosYStart: clientPosYStart,
      clientPosXOffset: clientPosDiffX,
      clientPosYOffset: clientPosDiffY,
      imageWidth: Ref.current?.offsetWidth,
      imageHeight: Ref.current?.offsetHeight,
      isMove: resizeDir ? true : false,
      resizeDir: resizeDir
    });
    setMaskChangedIndex(index);
  }

  const deleteMask = (data) => {
    if (!readOnly) {
      ondeleteMask?.(data);
      setCurrentMask(currentMask.filter((mask) => mask.data.index !== data.data.index|| mask.imageSeqNo !== data.imageSeqNo))
    }
  }

  const ifFound = () => {
    setIsFound(false);
    hideMaskImage?.();
    onError && onError?.();
  }
  const saveMasking = () => {
    if (!readOnly) {
      onsaveMasks(masks, currentId);
    }
  }

  useEffect(() => {
    masks.forEach((mask, idx) => {
      mask['data'] = { index: idx };
      mask['isDragged'] = true;
    })
    setCurrentMask(masks);
    setCount(masks.length);
  },[masks?.length])

  return (
    <div onContextMenu={contextMenu} className={clsx(imageClassName, classes.container)} onClick={onClick}>
      {enableMask && 
        masks?.map((rect, index) => (
          <DrawBox
            key={index}
            index={index}
            rect={rect}
            returnType={returnType}
            readOnly={readOnly}
            customstyle={customstyle}
            drawMask={(event) => onBoxMoveStart(event, index)}
            enableMask={enableMask}
            deleteMask={deleteMask}
            changing={index === maskChangedIndex}
          />
        ))
      }
      {!readOnly && returnType?.showSaveButton && (
        <div>
          <button
            data-button="save"
            className={classes.saveMasks}
            onClick={saveMasking}
          >
            Save Masking
          </button>
        </div>
      )}
      {((!readOnly && returnType.showAreaCount) || showMaskedAreaCount) && isFound && (
        <div data-count="count" className={classes.countMasks}>
          Area Masked on Image: {masks.length}
        </div>
      )}
      {isFound && 
        <img 
          onContextMenu={contextMenu}
          ref={Ref}
          onTouchStart={onMouseDown}
          onMouseDown={onMouseDown}
          // onError={ifFound}
          style={{ zIndex: 0}}
          alt={alt}
          src={props.src}
          width="100%"
          height="100%"
          // onLoad={() => onLoad?.()}
        />}
        {!isFound && <div className={classes.imageNotFound}><label>Image not found</label></div>}
    </div>
  )
}

export default Masking