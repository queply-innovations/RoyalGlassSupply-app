<?php

namespace App\Console\Commands;

use App\Models\ProductPrice;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class UpdateSellingPricesOnProductPricesTable extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'product-prices:update-selling-prices';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Updates the Selling Price on all of Product Prices';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $productPrices = ProductPrice::get();

        try {
            DB::beginTransaction();

            foreach($productPrices as $productPrice) {
                $capitalPrice = $productPrice->capital_price;
                if($capitalPrice == 0) continue;
                $markupPercent = $productPrice->markup_price / $capitalPrice;
        
                $markupPrice = $productPrice->capital_price * $markupPercent;
                $cost = $productPrice->capital_price + $markupPrice;

                if(floor($cost) != $cost) {
                    $oldCost = $productPrice->capital_price + $markupPrice;
                    $cost = round($cost);
                    $markupPrice = $markupPrice + ($cost - $oldCost);
                }

                $update = $productPrice->update([
                    'cost' => $cost,
                    'markup_price' => $markupPrice,
                    'price' => $cost - $productPrice->sale_discount
                ]);

                $this->info('Product Price id: '.$productPrice->id.' = updated successfully');
            }

            DB::commit();
        } catch (\Exception $th) {
            DB::rollBack();
            $this->info($e->getMessage());
            $this->info('Rolling back updates');
        }
    }
}
