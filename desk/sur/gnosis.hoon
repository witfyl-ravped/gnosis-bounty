|%
+$  chain-id  @t
::
+$  safe-contents  [threshold=@ud ethbalance=@t owners=(list address=@t)]
::
+$  safes  (map chain-id (map address=@t safe-contents))
::
+$  address-book  (map chain-id (map address=@t name=@t))
::
+$  safe
  $:  address=@t
      name=@t
      owners=(list [address=@t name=@t])
  ==
::
+$  action
    $%  [%addedsafes safes]
        [%addressbook address-book]
        [%fe-test ~]
        :: [%add-safe safe]        
        :: [%add-address new-address=@t]
    ==
::
+$  update
    $%  [%test-num num=@ud]
    ==
--