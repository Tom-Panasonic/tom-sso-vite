import * as cdk from "@aws-cdk/core";
import * as ec2 from "@aws-cdk/aws-ec2";
import * as ecs from "@aws-cdk/aws-ecs";
import * as ecsPatterns from "@aws-cdk/aws-ecs-patterns";

export class MyFargateAppStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // VPCの作成
    const vpc = new ec2.Vpc(this, "MyVpc", {
      maxAzs: 2, // 可用性ゾーンの数
    });

    // ECSクラスターの作成
    const cluster = new ecs.Cluster(this, "MyCluster", {
      vpc,
    });

    // Fargateサービスの作成
    const fargateService =
      new ecsPatterns.ApplicationLoadBalancedFargateService(
        this,
        "MyFargateService",
        {
          serviceName: "sso-vite-app",
          cluster,
          taskImageOptions: {
            image: ecs.ContainerImage.fromRegistry(
              // replace with your Docker image URI
              "your-account-id.dkr.ecr.ap-northeast-1.amazonaws.com/sso-sample-app-repository:latest"
            ),
            containerPort: 80,
          },
        }
      );

    // セキュリティグループの設定（必要に応じて）
    fargateService.service.connections.allowFromAnyIpv4(
      ec2.Port.tcp(80),
      "Allow HTTP traffic"
    );
  }
}
