|%
+$  chain-id  @t
::
+$  address  @t
::
+$  name  @t
::
+$  safe-contents  [threshold=@ud ethbalance=@t owners=(list address=@t)]
::
+$  safes  (map chain-id (map address=@t safe-contents))
::
+$  address-book  (map chain-id (map address name))
::
+$  owned-safes  (map address (map chain-id (list address)))
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
        [%ownedsafes owned-safes]
        [%fe-test ~]
        :: [%add-safe safe]        
        :: [%add-address new-address=@t]
    ==
::
+$  update
    $%  [%address-book =address-book]
        [%added-safes =safes]
        [%owned-safes =owned-safes]
        [%test-num num=@ud]
    ==
--