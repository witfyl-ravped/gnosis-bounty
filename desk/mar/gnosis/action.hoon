/-  *gnosis
|_  act=action
++  grab
  |%
  ++  noun  action
  ++  json
    =,  dejs:format
    |=  jon=json
    %-  action
    :: ~&  >  jon
    =<  (fe-action jon)
    |%
    ++  fe-action
      %-  of
      :~
        [%fe-test ul]
        [%add-address so]
        [%add-safe parse-safe]
      ==
    ++  parse-safe
      %-  ot
      :~  [%value so]
          [%name so]
          [%owners (ar parse-owners)]
      ==
    ++  parse-owners
      %-  ot
      :~  [%value so]
          [%name so]
      ==
    --
  --
++  grow
  |%
  ++  noun  act
  --
++  grad  %noun
--
