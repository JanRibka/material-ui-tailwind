// copied from @janribkaui/system/createStyled
function slotShouldForwardProp(prop: string) {
  return prop !== 'ownerState' && prop !== 'theme' && prop !== 'sx' && prop !== 'as';
}

export default slotShouldForwardProp;
