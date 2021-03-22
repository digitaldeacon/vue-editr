export const clearSelection = (): void => {
  const newSelection = window.getSelection();
  if (newSelection) {
    if (newSelection.empty !== undefined) {
      newSelection.empty();
    }
    if (newSelection.removeAllRanges !== undefined) {
      newSelection.removeAllRanges();
    }
  }
};

export const saveSelection = (): Range | undefined => {
  if (window.getSelection !== undefined) {
    const selection: Selection = window.getSelection() as Selection;
    if (selection.getRangeAt && selection.rangeCount) {
      return selection.getRangeAt(0);
    }
  }
  return undefined;
};

export function restoreSelection(range?: Range): void {
  if (range) {
    let selection: Selection;
    if (window.getSelection !== undefined) {
      selection = window.getSelection() as Selection;
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }
}
