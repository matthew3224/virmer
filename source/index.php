<section class="purchase">
    <div class="container  purchase__wrapper">
        <h2 class="purchase__title">{507 | resource : 'purchaseTitle'}</h2>
        <ul class="purchase__list">
            {foreach $purchaseList as $idx => $purchase}
            <li class="purchase__item  purchase-item">
                <div class="purchase-item__wrapper">
                    <svg class="purchase__svg  purchase__svg--choice" width="54" height="54">
                        <use xlink:href="#icon-purchase-0{$idx+1}"></use>
                    </svg>
                    <div class="purchase-item__content  purchase-item-content">
                        <h3 class="purchase-item-content__title">{$purchase.title}</h3>
                        <p class="purchase-item-content__paragraph">{$purchase.text}</p>
                    </div>
                </div>
            </li>
            {/foreach}
        </ul>
    </div>
</section>