import { useField } from "formik";
import React, { useState } from "react";

import IQuestion from "types/form/question";

interface State {
  variations: number[][][];
  isMounted: boolean;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useAssociatedLogic = (
  factors: IQuestion["factors"],
  name: string,
  maxLoop: string,
  TOTAL_CARDS: number
) => {
  const [field, , helpers] = useField(name);

  const [state, setState] = useState<State>({
    variations: [],
    isMounted: false,
  });
  const [totalClick, setClick] = useState(0);
  const filteredFactors = factors?.filter((f) => f !== null);
  const modalitiesPerFactor = filteredFactors
    ?.map((f) => f.modalities?.length)
    .filter((m) => m !== 0);
  const totalVariations = modalitiesPerFactor?.reduce((a, b) => a * b, 1);

  const getMaxVariation: any = (n: number, k: number) => {
    const factorialize: any = (num: number) => {
      if (num < 0) return -1;
      else if (num === 0) return 1;
      else {
        return num * factorialize(num - 1);
      }
    };

    const _A = (n: number, k: number) => {
      return factorialize(n) / factorialize(n - k);
    };

    return _A(n, k) / factorialize(k);
  };

  const maxVariations = React.useMemo(() => {
    if (totalVariations) return getMaxVariation(totalVariations, TOTAL_CARDS);
  }, [totalVariations]);

  const generate = () => {
    if (maxVariations - 1 === state.variations.length) {
      console.log("End of variations");
      return;
    }
    if (!modalitiesPerFactor) {
      return;
    }
    const randomize = () => {
      return modalitiesPerFactor?.map((m) => Math.floor(Math.random() * m));
    };

    const card1 = randomize();
    const card2 = randomize();

    const variation = [card1, card2];

    const cardsAreSame = (arrA: number[], arrB: number[]) => {
      return JSON.stringify(arrA) === JSON.stringify(arrB);
    };

    if (cardsAreSame(card1, card2)) {
      console.log("same cards");
      generate();
    } else if (
      state.variations.some(
        (v) => JSON.stringify(v) === JSON.stringify(variation)
      ) ||
      state.variations.some(
        (v) => JSON.stringify(v) === JSON.stringify(variation.reverse())
      )
    ) {
      console.log("Variation already exists");
      generate();
    } else {
      setState({
        ...state,
        variations: [...state.variations, variation],
        isMounted: true,
      });
    }
  };
  const handleClick = (
    cardIdx: number,
    values?: IQuestion["mono_thumbnail_input"]
  ) => {
    generate();
    setClick(totalClick + 1);

    const formatPayload = () => {
      const lastVariation = state.variations[state.variations.length - 1];

      const format = (el: number) => {
        return filteredFactors?.map((f, idx) => {
          return {
            [f.title]: f.modalities[lastVariation[el][idx]].description,
          };
        });
      };

      // If values !== undefined, it means that the we are on MonoThumbnail, we dont need choice but we need mono_thumbnail_input

      return {
        variations: [...Array(TOTAL_CARDS)].map((_, idx) => format(idx)),
        choice: values ? undefined : cardIdx,
        mono_thumbnail_input: values ? values : undefined,
      };
    };

    if (!field.value) {
      helpers.setValue([formatPayload()]);
    } else {
      helpers.setValue([...field.value, formatPayload()]);
    }
  };

  console.log("maxVariations", maxVariations); // 27
  console.log("maxLoop", maxLoop); // 4
  console.log("totalClick", totalClick); // 0

  // TODO: refactor this
  const isFinished =
    totalClick ===
      (maxVariations - 1 > (maxLoop && parseInt(maxLoop))
        ? maxLoop && parseInt(maxLoop)
        : maxVariations) ||
    field.value?.length ===
      ((maxLoop && parseInt(maxLoop) - 1) || maxVariations);

  const checkIsFinished = () => {
    const loop = maxLoop && parseInt(maxLoop);
    const hadValue = field.value?.length > 0;
    const valueLenght = field.value?.length;
    const limit = loop > maxVariations ? maxVariations : loop;

    if (hadValue) {
      return valueLenght === limit;
    } else {
      return totalClick === limit;
    }
  };

  return {
    generate,
    handleClick,
    setState,
    state,
    filteredFactors,
    totalClick,
    maxVariations,
    isFinished,
    checkIsFinished,
  };
};
