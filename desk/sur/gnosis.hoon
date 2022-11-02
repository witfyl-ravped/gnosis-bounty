|%
+$  safe
  $:  address=@t
      name=@t
      owners=(list [address=@t name=@t])
  ==
::
+$  action
    $%  [%add-safe safe]
        [%fe-test ~]
        [%add-address new-address=@t]
    ==
::
+$  update
    $%  [%test-num num=@ud]
    ==
--