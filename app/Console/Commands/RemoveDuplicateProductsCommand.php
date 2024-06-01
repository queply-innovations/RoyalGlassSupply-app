<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Product;
use Illuminate\Support\Facades\Log;

class RemoveDuplicateProductsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:remove-duplicate-products-command';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        try{
            $ids = Product::groupBy(['serial_no', 'name', 'brand', 'size', 'color'])
            ->get(['id'])
            ->all();
            Product::whereNotIn('id', $ids)->delete();
        } catch(\Exception $e){
            Log::info($e);
        }

    }
    
}
