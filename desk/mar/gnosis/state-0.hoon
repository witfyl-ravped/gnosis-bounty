/-  *gnosis
=/  state-0
  $:  =safes
      =address-book
      =cookies
      =owned-safes
      =session
  ==
=,  enjs:format
|_  stat=state-0
++  grab
  |%
  ++  noun  state-0
  --
++  grow
  |%
  ++  noun  stat
  ++  json  (make-state-object stat)
  ++  make-state-object
    |=  stat=state-0
    %-  pairs
    :~  
        'addedSafes'^(parse-added-safes safes.stat)
        'addressBook'^(parse-address-book address-book.stat)
        'session'^(parse-session session.stat)
    ==
  ++  parse-added-safes
    |=  =safes
    :-  %o
    %-  ~(run by safes)
    |=  safe=(map @t [@ud @t (list @t)])
    :-  %o
    %-  ~(run by safe)
    |=  [thresh=@ud ethebal=@t owners=(list @t)]
    %-  pairs
    :~  'ethBalance'^s/ethebal
        'threshold'^(numb thresh)
        'owners'^a/(turn owners :(corl (cury frond %value) ^json (lead %s)))
    ==  
  ::
  ++  parse-address-book
    |=  book=address-book
    :-  %o
    %-  ~(run by book)
    |=(buk=(map @t @t) o/(~(run by buk) (lead %s))) 
  ::
  ++  parse-owned-safes
    |=  =owned-safes
    =-  (frond 'ownedSafes'^o/-)
    %-  ~(run by owned-safes)
    |=  owned=(map @t (list @t))
    :-  %o
    %-  ~(run by owned)
    |=  [safs=(list address=@t)]
    a/(turn safs :(corl ^json (lead %s)))
  ++  parse-session
    |=  s=session
    %-  pairs
    :~  'lastChainId'^s/-.s
        'lastSafeAddress'^o/(~(run by +.s) (lead %s))
    ==
  --
++  grad  %noun
--