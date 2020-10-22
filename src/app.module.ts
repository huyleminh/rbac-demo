import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import DataViewer from "./components/DataViewer";

@Module({
 imports: [],
 controllers: [AppController, DataViewer],
 providers: [AppService],
})
export class AppModule {}